import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import Forecast from './Forecast'

function App (props) {
  return (
    <div>
      <Title />
      <Forecast />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
