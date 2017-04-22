import React from 'react'
import axios from 'axios'

class Forecast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {forecast: null}
  }
  componentDidMount () {
    axios.get('http://localhost:3000/forecast')
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
      forecast = <pre>{JSON.stringify(this.state.forecast, null, 4)}</pre>
    } else {
      forecast = 'Loading Forecast...'
    }
    return (
      <div>{forecast}</div>
    )
  }
}

export default Forecast
