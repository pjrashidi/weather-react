/* globals google alert */
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
  setSearchTerm (newSearchTerm) {
    this.setState({searchTerm: newSearchTerm})
  }
  render () {
    console.log(this.state)
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Search
          setSearchTerm={this.setSearchTerm}
          searchTerm={this.state.searchTerm}
          getData={this.getData}
        />
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
