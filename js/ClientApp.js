/* globals google alert */
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
    this.codeAddress = this.codeAddress.bind(this)
  }
  codeAddress () {
    var geocoder = new google.maps.Geocoder()
    var address = document.getElementById('searchInput').value
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        console.log(results[0].geometry.location.lat())
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }
  getData (e) {
    e.preventDefault()
    this.codeAddress()
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
          getData={this.getData}
          coordinates={this.state.coordinates}
        />
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
