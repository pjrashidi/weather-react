import React from 'react'

const Currently = (props) => {
  const { temperature, apparentTemperature, humidity } = props
  return (
    <div>
      <div>Current Temperature: {Math.round(temperature)}</div>
      <div>Feels like: {Math.round(apparentTemperature)}</div>
      <div>Humidity: {humidity * 100}%</div>
    </div>
  )
}

export default Currently
