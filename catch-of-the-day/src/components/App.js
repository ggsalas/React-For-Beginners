import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  constructor() {
    super()

    // get initial state
    this.state = {
      fishes: {},
      order: {}
    }

    // llamar al método addFish
    this.addFish = this.addFish.bind(this)
    // .. y al método loadSamples
    this.loadSamples = this.loadSamples.bind(this)
    // .. y al método addToOrder
    this.addToOrder = this.addToOrder.bind(this)
  }

  addFish(fish) {
    // Pasar el estado de fishes a una variable "fishes"
    const fishes = {...this.state.fishes}

    // agregar un nuevo pececillo
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish

    // avisar a react que actualice el estado de fishes
    this.setState({fishes: fishes})
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // copiar el estado de order a la constante order
    const order = {...this.state.order}

    // actualizar o agregar un nuevo pez a la orden
    order[key] = order[key] + 1 || 1

    // actualizar el estado de order
    this.setState({order: order})
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App
