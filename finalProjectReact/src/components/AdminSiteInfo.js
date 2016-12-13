import React from 'react'

class AdminSiteInfo extends React.Component {
  render() {
    return (
      <div className="AdminSite-info">
        <div className="AdminSite-info-menu">
          <a href={this.props.siteURL} className="button">Ir al sitio ></a>
        </div>
        <div className="AdminSite-info-form">
          <label className="AdminSite-info-form-item-title">Nombre del sitio</label>
          <div className="AdminSite-info-form-row">
            <span className="AdminSite-info-form-grey">www.localhost:3000/site/</span>
            <input className="AdminSite-info-form-input" placeholder="nombre" name="siteName"/>
          </div>
          <label className="AdminSite-info-form-item-title">Dropbox Folder</label>
          <div className="AdminSite-info-form-row">
            <input className="AdminSite-info-form-input" name="siteDropboxFolder" placeholder="/src/folder"/>
            <button className="button" name="siteDropboxFolder" placeholder="/src/folder">Seleccionar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminSiteInfo


