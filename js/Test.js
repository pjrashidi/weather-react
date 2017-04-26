import React from 'react'

class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stateTest: true
    }
    this.flipStateTest = this.flipStateTest.bind(this)
  }
  flipStateTest (e) {
    e.preventDefault()
    this.setState({stateTest: false})
    console.log(this.state.stateTest)
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
