import React from 'react'
import Forecast from './Forecast'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coordinates: '24.3601,-71.0589'
    }
  }
  render () {
    return <Forecast coordinates={this.state.coordinates} />
  }
}

export default Search
