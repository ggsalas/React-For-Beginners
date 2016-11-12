import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="esta es la tagline" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App
