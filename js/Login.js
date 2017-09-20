import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleLogin.bind(this)
  }
  handleChange (event) {
    this.props.setStateString(event.target.id, event.target.value)
  }
  handleLogin (event) {
    event.preventDefault()
    console.log('test')
  }
  handleRegister (event) {
    event.preventDefault()
    console.log('test')
  }
  render () {
    return (
      <div>
        <form>
          <label>User</label>
          <input
            id='username'
            value={this.props.username}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            id='password'
            value={this.props.password}
            onChange={this.handleChange}
          />
          <input type='submit' value='Login' onClick={this.handleLogin} />
          <input type='submit' value='Register' onClick={this.handleRegister} />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  setStateString: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default Login
