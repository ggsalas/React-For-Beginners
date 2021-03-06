import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class SiteFile extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.files = this.props.entries.filter((entry) => entry['.tag'] === 'file')

    this.state = { 
      fileUrl:  '', 
      fileSelected: this.files.find((entry) => entry.id === this.props.fileId),
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyboard );
    this._fileGet({
      path:  this.props.fileId, 
      fileSelected: this.files.find((entry) => entry.id === this.props.fileId)
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyboard);
  }

  render() {
    const fileSelectedIndex = this.files.findIndex((entry) => entry.id === this.state.fileSelected.id)
    const fileNext = this.files[fileSelectedIndex + 1] ? this.files[fileSelectedIndex + 1] : ''
    const filePrevious = this.files[fileSelectedIndex - 1] ? this.files[fileSelectedIndex - 1] : ''

    const imageExt = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'exif', 'svg', 'bmp', 'webp']
    const videoExt = ['mp4', 'webm', 'ogv', '3gp', 'ogg', 'mp3', 'wave', 'wav', 'aac'] //mpeg not supported?
    // TODO file extensions to display iframe, else {display message and download button}
    const fileExt = this.state.fileSelected.name.split('.').slice(-1)[0].toLowerCase()

    const iframe = this.state.fileUrl ? <iframe key={this.state.fileSelected.id} className="siteFile-iframe" src={`https://docs.google.com/viewer?url=${this.state.fileUrl}&embedded=true`}></iframe> : ''
    const image = <img key={this.state.fileSelected.id} className="siteFile-image" src={this.state.fileUrl} alt={this.props.fileName}/>
    const video = <video key={this.state.fileSelected.id} className="siteFile-video" src={this.state.fileUrl} controls autoPlay>Tu navegador no implementa el elemento <code>video</code>. </video>
    
    return (
      <div className="siteFile">
        <div className="siteFile-menu">
          <a href={this.state.fileUrl} className="button button-download">Descargar</a>
          <div>
          {filePrevious !== '' ? <button className="button" onClick={() => this._fileGet({path: filePrevious.id, fileSelected: filePrevious})}>&#8592; Anterior</button> : ''}
          {fileNext !== '' ? <button className="button" onClick={() => this._fileGet({path: fileNext.id, fileSelected: fileNext})}>Siguiente &#8594;</button> : ''}
          </div>
          <button type="button" onClick={this.props.fileClose} className="button button-close"></button>
        </div>
        <CSSTransitionGroup
          component="div"
          className="siteFile-preview"
          transitionName="siteFile-preview"
          transitionEnterTimeout={1300}
          transitionLeaveTimeout={200}
        >
          {imageExt.indexOf(fileExt) >= 0 ? image : videoExt.indexOf(fileExt) >= 0 ? video : iframe}
        </CSSTransitionGroup>
      </div>
    )
  }

  _handleKeyboard = (e) => {
    const fileSelectedIndex = this.files.findIndex((entry) => entry.id === this.state.fileSelected.id)
    const fileNext = this.files[fileSelectedIndex + 1] ? this.files[fileSelectedIndex + 1] : ''
    const filePrevious = this.files[fileSelectedIndex - 1] ? this.files[fileSelectedIndex - 1] : ''

    if(e.key === "Escape") { //esc key
      this.props.fileClose()
    }
    if(e.key === "ArrowLeft") { //previus
      this._fileGet({path: filePrevious.id, fileSelected: filePrevious})
    }
    if(e.key === "ArrowRight") { //next
      this._fileGet({path: fileNext.id, fileSelected: fileNext})
    }
  }

  _fileGet ({path, fileSelected} = {}) {
    return fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
      method: 'POST',
      headers: {
        'Authorization':'Bearer ' + this.props.dropboxAccessToken,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({path})
    })
    .then(resp => resp.json())
    .then(data => this.setState({fileUrl: data.link, fileSelected}))
  }
}

export default SiteFile

