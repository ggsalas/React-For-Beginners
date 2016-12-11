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
      entries: []
    }
  }

  componentDidMount(){
    this._entriesFor({path: this.props.initialPath})
    .then(entries => this.setState({entries}))
  }

  render() {
    return (
      <div className="SiteFolder">
        <ul>
          <li className="SiteFolder-item">Atrás</li>
          {this.state.entries.map(entry => <li key={entry.id} onClick={this._handleEntryClick.bind(this, entry)} className="SiteFolder-item">{entry.name}</li>)}
        </ul>
      </div>
    )
  }

  _handleEntryClick = (entry) => {
    if (entry['.tag'] === 'folder'){
      this._entriesFor({path: entry.path_lower})
      .then(entries => this.setState({entries}))
    } else if (entry['.tag'] === 'file') {
      console.log('file')
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

}

export default SiteFolder
