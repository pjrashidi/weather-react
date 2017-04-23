import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'
import Currently from './Currently'

class Forecast extends React.Component {
  // constructor (props) {
    // super(props)
    // this.state = {forecast: null}
  // }
  // componentDidUpdate () {
  //   axios.get(`http://localhost:3000/forecast/${this.props.coordinates}`)
  //     .then((response) => {
  //       this.setState({forecast: response.data})
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
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
  forecast: PropTypes.obj
  // coordinates: PropTypes.string
}

export default Forecast
