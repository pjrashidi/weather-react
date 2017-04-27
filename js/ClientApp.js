import React from 'react'
import ReactDOM from 'react-dom'
// import Test from './Test'
import Title from './Title'
import Search from './Search'
import Recent from './Recent'
import Forecast from './Forecast'
import { getForecast } from './getForecast'

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
    this.setForecast = this.setForecast.bind(this)
  }
  setSearchTerm (newSearchTerm) {
    this.setState({searchTerm: newSearchTerm})
  }
  setCoordinates (newCoordinates) {
    this.setState(
      {coordinates: newCoordinates},
      () => getForecast(this.state.coordinates, this.setForecast)
    )
  }
  setForecast (newForecast) {
    this.setState({forecast: newForecast})
  }
  render () {
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Search
          setSearchTerm={this.setSearchTerm}
          setCoordinates={this.setCoordinates}
          searchTerm={this.state.searchTerm}
        />
        <Recent />
        <Forecast
          forecast={this.state.forecast}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
