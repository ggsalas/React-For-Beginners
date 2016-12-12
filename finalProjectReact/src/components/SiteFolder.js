import React, {PropTypes} from 'react'

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
      path: this.props.initialPath
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
        <ul>
          {actualPath !== this.props.initialPath ? <li onClick={() => this._handleEntryClick({tag: 'folder', path: backPath})} className="SiteFolder-item">Atrás</li> : ''}
          {this.state.entries.map(entry => <li key={entry.id} onClick={() => this._handleEntryClick({tag: entry['.tag'], path: entry.path_lower})} className="SiteFolder-item">{entry.name}</li>)}
        </ul>
      </div>
    )
  }

  renderFile = () => {
  }

  _handleEntryClick = ({tag, path} = {}) => {
    if (tag === 'folder'){
      this._entriesFor({path})
      .then(entries => this.setState({entries, path}))
    } else if (tag === 'file') {
      console.log('file')
      console.log(this._file({path}))
    }
  }

  _entriesFor ({path} = {}) {
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
    .then(data => data.link)
  }
}

export default SiteFolder
