import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'

class App extends React.Component {
  render () {
    return Title
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('app'))
