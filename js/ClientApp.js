import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import Forecast from './Forecast'

function App (props) {
  return (
    <div>
      <Title />
      <Forecast coordinates='24.3601,-71.0589' />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
