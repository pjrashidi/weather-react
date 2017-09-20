import React from 'react'
import PropTypes from 'prop-types'

const Currently = props => {
  const { temperature, apparentTemperature, humidity } = props
  return (
    <div>
      <div>Current Temperature: {Math.round(temperature)}</div>
      <div>Feels like: {Math.round(apparentTemperature)}</div>
      <div>Humidity: {humidity * 100}%</div>
    </div>
  )
}

Currently.propTypes = {
  temperature: PropTypes.number,
  apparentTemperature: PropTypes.number,
  humidity: PropTypes.number
}
export default Currently
