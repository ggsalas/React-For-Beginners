import React from 'react'

class SiteFile extends React.Component {
  constructor() {
    super()
    this.state = { fileUrl: '' }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyboard );
    this._fileGet( {path: this.props.fileId } )
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyboard);
  }

  render() {
    const files = this.props.entries.filter((entry) => entry['.tag'] === 'file')
    const fileSelected = files.find((entry) => entry.id === this.props.fileId)
    const fileSelectedIndex = files.findIndex((entry) => entry.id === this.props.fileId)
    const fileNext = files[fileSelectedIndex + 1] ? files[fileSelectedIndex + 1] : ''
    const filePrevious = files[fileSelectedIndex - 1] ? files[fileSelectedIndex - 1] : ''

    const imageExt = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'exif', 'svg', 'bmp', 'webp']
    const videoExt = ['mp4', 'webm', 'ogv', '3gp', 'ogg', 'mp3', 'wave', 'wav', 'aac'] //mpeg not supported?
    const fileExt = fileSelected.name.split('.').slice(-1)[0].toLowerCase()

    const iframe = <iframe className="siteFile-iframe" src={`https://docs.google.com/viewer?url=${this.state.fileUrl}&embedded=true`}></iframe>
    const image = <img className="siteFile-image" src={this.state.fileUrl} alt={this.props.fileName}/>
    const video = <video className="siteFile-video" src={this.state.fileUrl} controls autoPlay>Tu navegador no implementa el elemento <code>video</code>. </video>
    
    return (
      <div className="siteFile">
        <div className="siteFile-menu">
          <a href={this.props.fileUrl} className="button button-download">Descargar</a>
          <div>
            <button className="button" onClick={() => this._fileGet({path: filePrevious.id})}>Anterior</button>
            <button className="button" onClick={() => this._fileGet({path: fileNext.id})}>Siguiente</button>
          </div>
          <button type="button" onClick={this.props.fileClose} className="button button-close"></button>
        </div>
        <div className="siteFile-preview">
          {imageExt.indexOf(fileExt) >= 0 ? image : videoExt.indexOf(fileExt) >= 0 ? video : iframe}
        </div>
      </div>
    )
  }

  _handleKeyboard = (e) => {
    if(e.key === "Escape") { //esc key
      this.props.fileClose()
    }
  }

  _fileGet ({path} = {}) {
    return fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
      method: 'POST',
      headers: {
        'Authorization':'Bearer ' + this.props.dropboxAccessToken,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({path})
    })
    .then(resp => resp.json())
    .then(data => this.setState({fileUrl: data.link}))
  }
}

export default SiteFile

