import React from 'react'
import AdminSiteInfo from './AdminSiteInfo'

class AdminSites extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      siteDisplayed: '' 
    }
  }

  render() {
    return (
      <div className="adminContainer">
        <div className="AdminSites">
          <div className="AdminSites-user">
            <div className="AdminSites-user-menu">
              <span>Hola {this.props.userName}</span>
              <button className="button">Salir</button>
            </div>
            <h2 className="AdminSites-user-title">Tus Sitios:</h2>
            <ul className="AdminSites-user-sites">
              <li className="AdminSites-user-sites-item">Web 1</li>
              <li className="AdminSites-user-sites-item AdminSites-user-sites-item-selected">Web 2</li>
              <li className="AdminSites-user-sites-item">Web 3</li>
            </ul>
            <button className="AdminSites-addWeb button">+ Agregar Web</button>
          </div>
        </div>
        <AdminSiteInfo addSite={this.props.addSite}/>
      </div>
    )
  }
}

export default AdminSites


