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
  }
  render () {
    return (
      <div>
        <Title />
        <Search />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
