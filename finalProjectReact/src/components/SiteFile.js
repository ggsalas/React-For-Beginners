import React from 'react'

class SiteFile extends React.Component {
  render() {
    return (
      <div className="siteFile">
        <div className="siteFile-menu">
          <a href={this.props.fileURL} className="button button-download">Descargar</a>
          <button type="button" onClick={this.props.fileClose} className="button button-close"></button>
        </div>
        <iframe className="siteFile-iframe" src={`https://docs.google.com/viewer?url=${this.props.fileURL}&embedded=true`}></iframe>
      </div>
    )
  }
}

export default SiteFile

