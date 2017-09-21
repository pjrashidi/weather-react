import React from 'react'
import PropTypes from 'prop-types'
import { registerNewUser } from './registerNewUser.js'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.clearFields = this.clearFields.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (event) {
    this.props.setStateHandler({ [event.target.id]: event.target.value })
  }
  handleLogin (event) {
    event.preventDefault()
    console.log('login test')
  }
  clearFields () {
    this.props.setStateHandler({username: '', password: ''})
  }
  handleRegister (event) {
    event.preventDefault()
    registerNewUser(this.props.username, this.props.password, this.clearFields)
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
          <input type='button' value='Login' onClick={this.handleLogin} />
          <input type='button' value='Register' onClick={this.handleRegister} />
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  setStateHandler: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default Login
