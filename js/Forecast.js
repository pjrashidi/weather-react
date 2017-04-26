import React from 'react'
import PropTypes from 'prop-types'
import Currently from './Currently'

class Forecast extends React.Component {
  render () {
    let forecast
    if (this.props.forecast) {
      forecast =
        <div>
          <Currently {...this.props.forecast.currently} />
          <pre>{JSON.stringify(this.props.forecast, null, 4)}</pre>
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
  forecast: PropTypes.object
}

export default Forecast
