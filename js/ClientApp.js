import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Title from './Title'
import Search from './Search'
import Forecast from './Forecast'

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coordinates: '',
      forecast: {}
    }
    this.changeCoordinates = this.changeCoordinates.bind(this)
    this.getData = this.getData.bind(this)
  }
  getData (e) {
    e.preventDefault()
    console.log('getData')
    console.log(this.state.coordinates)
    axios.get(`http://localhost:3000/forecast/${this.state.coordinates}`)
      .then((response) => {
        console.log('success', response.data)
        this.setState({forecast: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }
  changeCoordinates (newCoordinates) {
    this.setState({coordinates: newCoordinates})
  }
  render () {
    return (
      <div>
        <Title />
        <Search
          changeCoordinates={this.changeCoordinates}
          coordinates={this.state.coordinates}
        />
        <form onSubmit={this.getData}>
          <input type='submit' />
        </form>
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
