import React from 'react'

class AdminSiteInfo extends React.Component {
  render() {
    return (
      <div className="AdminSite-info">
        <div className="AdminSite-info-menu">
          <a href={this.props.siteURL} className="button">Ir al sitio ></a>
        </div>
        <div className="AdminSite-info-form">
          <button className="button">form</button>
        </div>
      </div>
    )
  }
}

export default AdminSiteInfo


