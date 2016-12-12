import React, {PropTypes} from 'react'
import SiteFile from './SiteFile'

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
      fileDisplay: false,
      fileURL: '',
      fileName: ''
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
        {this.state.fileDisplay ? <SiteFile fileURL={this.state.fileURL} fileClose={this._fileClose} fileName={this.state.fileName}/> : null }
        <ul>
          {actualPath !== this.props.initialPath ? <li onClick={() => this._handleEntryClick({tag: 'folder', path: backPath})} className="SiteFolder-item SiteFolder-item-back">Atrás</li> : ''}
          {this.state.entries.map(entry => <li key={entry.id} onClick={() => this._handleEntryClick({tag: entry['.tag'], path: entry.path_lower, name: entry.name})} className="SiteFolder-item">{entry.name}</li>)}
        </ul>
      </div>
    )
  }

  _handleEntryClick = ({tag, path, name} = {}) => {
    if (tag === 'folder'){
      this._entriesFor( {path} )
      .then(entries => this.setState( {entries, path} ))
    } else if (tag === 'file') {
      this._file( {path} )
      .then( this.setState( {fileDisplay: true, fileName: name}) )
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
  
  _file ({path} = {}) {
    return fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
      method: 'POST',
      headers: {
        'Authorization':'Bearer ' + DROPBOX_ACCESS_TOKEN,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({path})
    })
    .then(resp => resp.json())
    .then(data => this.setState({fileURL: data.link}))
  }
  
  _fileClose = (e) => {
    e.preventDefault
    this.setState({fileDisplay: false}) 
  }
}

export default SiteFolder
