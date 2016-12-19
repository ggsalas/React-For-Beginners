import React from 'react'
import AdminSites from './AdminSites'

class Admin extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      'userIdDropbox': 'prnzgrtU38AAAAAAAAAAE-SiM917HjJloZISMGiouOPIkzaHhzShfUz92YhwGx8N', // Dropbox Access Token
      'userName': 'Wenceslao',
      'sites': {}
    }
  }

  addSite = (site) => {
    // update state
    const sites = {...this.state.sites}
    const timestamp = Date.now()
    sites[`site-${timestamp}`] = site 

    // Set state
    this.setState({sites})
  }

  render() {
    return (
      <div className="admin">
        <AdminSites userIdDropbox={this.state.userIdDropbox} userName={this.state.userName} sites={this.state.sites} addSite={this.addSite}/> 
      </div>
    )
  }
}

export default Admin

