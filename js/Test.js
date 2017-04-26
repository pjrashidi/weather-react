import React from 'react'

class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stateTest: true
    }
    this.flipStateTest = this.flipStateTest.bind(this)
    this.logState = this.logState.bind(this)
  }
  flipStateTest (e) {
    e.preventDefault()
    this.setState({stateTest: false})
    this.logState()
  }
  logState () {
    console.log(this.state)
  }
  render () {
    return (
      <form onSubmit={this.flipStateTest}>
        <input type='submit' value='TEST' />
      </form>
    )
  }
}

export default Test
