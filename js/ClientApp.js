import React from 'react'
import ReactDOM from 'react-dom'
import Title from './Title'
import Search from './Search'

class App extends React.Component {
  render () {
    return (
      <div>
        <Title />
        <Search />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
