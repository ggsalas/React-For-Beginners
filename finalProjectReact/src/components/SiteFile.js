import React from 'react'

class SiteFile extends React.Component {
  render() {
    const imageExt = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'exif', 'svg', 'bmp', 'webp']
    const fileExt = this.props.fileName.split('.').slice(-1)[0].toLowerCase()
    const iframe = <iframe className="siteFile-iframe" src={`https://docs.google.com/viewer?url=${this.props.fileURL}&embedded=true`}></iframe>
    const image = <img className="siteFile-image" src={this.props.fileURL} alt={this.props.fileName}/>

    return (
      <div className="siteFile">
        <div className="siteFile-menu">
          <a href={this.props.fileURL} className="button button-download">Descargar</a>
          <button type="button" onClick={this.props.fileClose} className="button button-close"></button>
        </div>
        <div className="siteFile-preview">
          {imageExt.indexOf(fileExt) == -1 ? iframe : image}
        </div>
      </div>
    )
  }
}

export default SiteFile

