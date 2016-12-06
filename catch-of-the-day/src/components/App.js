import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  constructor() {
    super()

    // get initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  // Life Cicle of React Methods
  // Sincroniza con la base de datos
  componentWillMount(){
    // esto se ejecuta antes de que se renderice
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      }
    )

    // chequear si hay localStorage para order    
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
    // actualizar el estado de order
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }
  
  // no se de que la va
  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  // Guarda el estado de order
  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }



  addFish = (fish) => {
    // Pasar el estado de fishes a una variable "fishes"
    const fishes = {...this.state.fishes}

    // agregar un nuevo pececillo
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish

    // avisar a react que actualice el estado de fishes
    this.setState({fishes: fishes})
  }

  updateFish = (key, updateFish) => {
    const fishes = {...this.state.fishes}
    fishes[key] = updateFish
    this.setState({fishes})
  }

  removeFish = (key) => {
    const fishes = {...this.state.fishes}
    fishes[key] = null //only because firebase - delete fishes[key]
    this.setState({fishes})
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // copiar el estado de order a la constante order
    const order = {...this.state.order}

    // actualizar o agregar un nuevo pez a la orden
    order[key] = order[key] + 1 || 1

    // actualizar el estado de order
    this.setState({order: order})
  }

  removeFromOrder = (key) => {
    const order = {...this.state.order}
    delete order[key]
    this.setState({order})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="esta es la tagline" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App
