import React from 'react'
import AdminSites from './AdminSites'
import AdminSiteInfo from './AdminSiteInfo'

class Admin extends React.Component {
  static defaultProps = {
    userName: 'Wenceslao',
    siteUrl: 'http://localhost:3000/site/catedra1'
  }

  render() {
    return (
      <div className="admin">
        <AdminSites userName={this.props.userName} /> 
        <AdminSiteInfo siteURL={this.props.siteUrl}/>
      </div>
    )
  }
}

export default Admin

