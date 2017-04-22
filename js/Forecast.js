import React from 'react'
import axios from 'axios'

class Forecast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {forecast: 'null'}
  }
  componentDidMount () {
    axios.get('http://localhost:3000/forecast')
      .then((response) => {
        this.setState({forecast: JSON.stringify(response.data, null, 4)})
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    return (
      <pre><code>{this.state.forecast}</code></pre>
    )
  }
}

export default Forecast
