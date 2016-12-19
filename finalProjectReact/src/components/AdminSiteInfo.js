import React from 'react'

class AdminSiteInfo extends React.Component {
  createSite = (event) => {
    event.preventDefault()
    const site = {
      siteName:this.siteName.value,
      siteDropboxFolder: this.siteDropboxFolder.value
    }
    this.props.addSite(site)
  }
  render() {
    return (
      <div className="AdminSite-info">
        <div className="AdminSite-info-menu">
          <a href={this.props.siteURL} className="button">Ir al sitio ></a>
        </div>
        <form className="AdminSite-info-form" onSubmit={(e) => this.createSite(e)}>
          <label className="AdminSite-info-form-item-title">Nombre del sitio</label>
          <div className="AdminSite-info-form-row">
            <span className="AdminSite-info-form-grey">www.localhost:3000/site/</span>
            <input className="AdminSite-info-form-input" ref={(input) => this.siteName = input} placeholder="nombre" />
          </div>
          <label className="AdminSite-info-form-item-title">Dropbox Folder</label>
          <div className="AdminSite-info-form-row">
            <input className="AdminSite-info-form-input" ref={(input) => this.siteDropboxFolder = input}  placeholder="/src/folder"/>
            {/*
            <button className="button" name="siteDropboxFolder" placeholder="/src/folder">Seleccionar</button>
            */}
          </div>
          <div className="AdminSite-info-form-row">
              <button className="button" type="submit">Crear Sitio Web</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AdminSiteInfo


