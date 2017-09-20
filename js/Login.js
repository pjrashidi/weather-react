import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (event) {
    this.props.setStateString(event.target.id, event.target.value)
  }
  handleLogin (event) {
    event.preventDefault()
    console.log('login test')
  }
  handleRegister (event) {
    event.preventDefault()
    let newUserData = {
      username: this.props.username,
      password: this.props.password
    }
    axios
      .get(`http://localhost:3000/mongodb/${JSON.stringify(newUserData)}`)
      .then(response => {
        console.log('success', response.data)
      })
      .catch(error => {
        console.log(error)
      })
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
  setStateString: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default Login
