import React from 'react'
import PropTypes from 'prop-types'
import { loginUser } from './loginUser.js'
import { registerNewUser } from './registerNewUser.js'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.clearFields = this.clearFields.bind(this)
    this.loginSuccessful = this.loginSuccessful.bind(this)
    this.logout = this.logout.bind(this)
  }
  handleChange (event) {
    this.props.setStateHandler({ [event.target.id]: event.target.value })
  }
  handleLogin (event) {
    event.preventDefault()
    loginUser(this.props.username, this.props.password, this.loginSuccessful)
  }
  handleRegister (event) {
    event.preventDefault()
    registerNewUser(this.props.username, this.props.password, this.clearFields)
  }
  clearFields () {
    this.props.setStateHandler({ username: '', password: '' })
  }
  loginSuccessful () {
    this.props.setStateHandler({ loggedIn: this.props.username })
    this.clearFields()
  }
  logout (event) {
    console.log('bueller?')
    this.props.setStateHandler({ loggedIn: '' })
  }
  render () {
    return (
      <div>
        {this.props.loggedIn !== ''
          ? <div>
              <div>Logged in as {this.props.loggedIn}</div>
            <input type='button' value='Log out' onClick={this.logout} />
          </div>
          : <form>
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
            <input
              type='button'
              value='Register'
              onClick={this.handleRegister}
              />
          </form>}
      </div>
    )
  }
}

Login.propTypes = {
  setStateHandler: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  loggedIn: PropTypes.string
}

export default Login
