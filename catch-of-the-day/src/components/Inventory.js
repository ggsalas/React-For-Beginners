import React from 'react'
import AddFishForm from './AddFishForm' 
import base from '../base' //connect with firebase

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user){
        this.authHandler(null, {user})
      }
    })
  }

  logout = () => {
    base.unauth()
    this.setState({uid:null})
  }

  handleChange = (e, key) => {
    const fish = this.props.fishes[key]
    const updateFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updateFish)
  }

  authenticate = (provider) => {
    console.log(`Trying to log in with ${provider}`)
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler = (err, authData) => {
    console.log(authData)
    if(err) {
      console.log(err)
      return
    }
    // grab the store info
    const storeRef = base.database().ref(this.props.storeId) 

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}
      console.log(data)

      // claims as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }
      // set state
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <p>Sign in to manage your store's inventoy</p>
        <button className="github" onClick={() => this.authenticate('github')}>Login with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Login with Twitter</button>
      </nav>
    )
  }

  renderInventory = (key) =>{
    const fish = this.props.fishes[key]
    return(
      <div className="fish-edit" key={key}>
        <input name="name" placeholder="Fish Name" value={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input name="price" type="text" placeholder="Fish Price" value={fish.price} onChange={(e) => this.handleChange(e, key)} />
        <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)}></textarea>
        <input name="image" type="text" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }


  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    // check if they are no logued in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store</p>
          {logout}
        </div>
      )
    }
  

    return(
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory
