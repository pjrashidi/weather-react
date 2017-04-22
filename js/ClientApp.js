import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import Search from './Search'

function App (props) {
  return (
    <div>
      <Title />
      <Search />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
