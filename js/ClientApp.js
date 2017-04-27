import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
// import Test from './Test'
import Title from './Title'
import Search from './Search'
import Forecast from './Forecast'

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      coordinates: '',
      forecast: {}
    }
    this.setSearchTerm = this.setSearchTerm.bind(this)
    this.setCoordinates = this.setCoordinates.bind(this)
    this.getData = this.getData.bind(this)
  }
  getData () {
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
  setSearchTerm (newSearchTerm) {
    this.setState({searchTerm: newSearchTerm})
  }
  setCoordinates (newCoordinates) {
    this.setState({coordinates: newCoordinates})
    this.getData()
  }
  render () {
    console.log(this.state)
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Search
          setSearchTerm={this.setSearchTerm}
          setCoordinates={this.setCoordinates}
          searchTerm={this.state.searchTerm}
        />
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
