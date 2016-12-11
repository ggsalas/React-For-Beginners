import React from 'react'
import AdminSites from './AdminSites'
import AdminSiteInfo from './AdminSiteInfo'

class Admin extends React.Component {

  render() {
    return (
      <div className="admin">
        <AdminSites/> 
        <AdminSiteInfo/>
      </div>
    )
  }
}

export default Admin

