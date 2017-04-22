import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import axios from 'axios'

axios.get('http://localhost:3000/')
  .then((response) => {
    console.log('success', response)
  })
  .catch((error) => {
    console.log(error)
  })

class App extends React.Component {
  render () {
    return Title
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
