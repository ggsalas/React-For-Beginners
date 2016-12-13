import React from 'react'

class SiteFile extends React.Component {
  render() {
    const imageExt = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'exif', 'svg', 'bmp', 'webp']
    const videoExt = ['mp4', 'webm', 'ogv', '3gp', 'ogg', 'mp3', 'wave', 'wav', 'aac'] //mpeg not supported?
    const fileExt = this.props.fileName.split('.').slice(-1)[0].toLowerCase()

    const iframe = <iframe className="siteFile-iframe" src={`https://docs.google.com/viewer?url=${this.props.fileURL}&embedded=true`}></iframe>
    const image = <img className="siteFile-image" src={this.props.fileURL} alt={this.props.fileName}/>
    const video = <video className="siteFile-video" src={this.props.fileURL} controls autoPlay>Tu navegador no implementa el elemento <code>video</code>. </video>
    
    return (
      <div className="siteFile">
        <div className="siteFile-menu">
          <a href={this.props.fileURL} className="button button-download">Descargar</a>
          <button type="button" onClick={this.props.fileClose} className="button button-close"></button>
        </div>
        <div className="siteFile-preview">
          {imageExt.indexOf(fileExt) >= 0 ? image : videoExt.indexOf(fileExt) >= 0 ? video : iframe}
        </div>
      </div>
    )
  }
}

export default SiteFile

