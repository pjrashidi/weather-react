import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import Search from './Search'

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coordinates: '',
      forecast: {}
    }
    this.changeCoordinates = this.changeCoordinates.bind(this)
  }
  changeCoordinates (newCoordinates) {
    this.setState({coordinates: newCoordinates})
  }
  render () {
    return (
      <div>
        <Title />
        <Search
          changeCoordinates={this.changeCoordinates}
          coordinates={this.state.coordinates}
        />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
