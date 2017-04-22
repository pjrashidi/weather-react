import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Currently from './Currently'

class Forecast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {forecast: null}
  }
  componentDidMount () {
    axios.get(`http://localhost:3000/forecast/${this.props.coordinates}`)
      .then((response) => {
        this.setState({forecast: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    let forecast
    if (this.state.forecast) {
      forecast =
        <div>
          <Currently {...this.state.forecast.currently} />
          <pre>{JSON.stringify(this.state.forecast, null, 4)}</pre>
        </div>
    } else {
      forecast = 'Loading Forecast...'
    }
    return (
      <div>{forecast}</div>
    )
  }
}

Forecast.propTypes = {
  coordinates: PropTypes.string
}

export default Forecast
