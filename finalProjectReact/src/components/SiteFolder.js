import React, {PropTypes} from 'react'
import SiteFile from './SiteFile'
import CSSTransitionGroup from 'react-addons-css-transition-group'

//draft
const DROPBOX_ACCESS_TOKEN = 'prnzgrtU38AAAAAAAAAAE-SiM917HjJloZISMGiouOPIkzaHhzShfUz92YhwGx8N'
const BASE_ENTRIES = {
  'recursive': false,
  'include_media_info': false,
  'include_deleted': false
}

class SiteFolder extends React.Component {
  static propTypes = {
    initialPath: PropTypes.string.isRequired
  }
  static defaultProps = {
    initialPath: '/icb'
  }

  constructor(props, context){
    super(props, context)
    this.state = {
      entries: [],
      path: this.props.initialPath,
      fileId: ''
    }
  }

  componentDidMount(){
    this._entriesFor({path: this.state.path})
    .then(entries => this.setState({entries}))
  }

  render() {
    const actualPath = this.state.path
    const backPath = actualPath.split('/').slice(0, -1).join('/')
    return (
      <div className="SiteFolder"> 
        {this.state.fileId !== '' ? <SiteFile fileId={this.state.fileId} entries={this.state.entries} fileClose={this._fileClose} dropboxAccessToken={DROPBOX_ACCESS_TOKEN}  /> : null }
        <CSSTransitionGroup
          component="ul"
          className="SiteFolder-list"
          transitionName="siteFolder-list"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={1}
        >
          {actualPath !== this.props.initialPath ? <li key="back" onClick={() => this._handleEntryClick({tag: 'folder', path: backPath})} className="SiteFolder-item SiteFolder-item-back">Atrás</li> : ''}
          {this.state.entries.map(entry => <li key={entry.id} onClick={() => this._handleEntryClick({tag: entry['.tag'], entryId: entry.id, path: entry.path_lower, name: entry.name})} className={entry['.tag'] === 'file' ? 'SiteFolder-item SiteFolder-item-file' : 'SiteFolder-item SiteFolder-item-folder'}>{entry.name}</li>)}
        </CSSTransitionGroup>
      </div>
    )
  }

  _handleEntryClick = ({tag, entryId, path, name} = {}) => {
    if (tag === 'folder'){
      this._entriesFor( {path} )
      .then(entries => this.setState( {entries, path} ))
    } else if (tag === 'file') {
      this.setState( {fileId: entryId} )
    }
  }

  _entriesFor = ({path} = {}) => {
    return fetch('https://api.dropboxapi.com/2/files/list_folder',{
      method: 'POST', 
      body: JSON.stringify(Object.assign({}, BASE_ENTRIES, {path})),
      headers: {
        'Authorization':'Bearer ' + DROPBOX_ACCESS_TOKEN ,
        'Content-Type':'application/json'
      }
    })  
    .then(resp => resp.json())
    .then(data => data.entries)
  }
  
  _fileClose = (e) => {
    this.setState({fileId: ''}) 
  }
}

export default SiteFolder
