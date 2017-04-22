import React from 'react'
import Forecast from './Forecast'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = { coordinates: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    this.setState({coordinates: event.target.value})
  }
  render () {
    let forecast
    if (this.state.coordinates) {
      forecast = <Forecast coordinates={this.state.coordinates} />
    } else {
      forecast = 'Please Enter Coordinates'
    }
    return (
      <div>
        <input
          value={this.state.coordinates}
          onChange={this.handleChange}
        />
        {forecast}
      </div>
    )
  }
}

export default Search
