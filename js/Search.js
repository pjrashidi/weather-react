import React from 'react'
import Forecast from './Forecast'
import PropTypes from 'prop-types'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    this.props.changeCoordinates(event.target.value)
  }
  render () {
    let forecast
    if (this.props.coordinates) {
      forecast = <Forecast coordinates={this.props.coordinates} />
    } else {
      forecast = 'Please Enter Coordinates'
    }
    return (
      <div>
        <input
          value={this.props.coordinates}
          onChange={this.handleChange}
        />
        {forecast}
      </div>
    )
  }
}

Search.propTypes = {
  changeCoordinates: PropTypes.func,
  coordinates: PropTypes.string
}

export default Search
