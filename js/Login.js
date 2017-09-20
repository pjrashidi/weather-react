import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(event) {
    event.preventDefault();
    console.log('test');
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label>User</label>
          <input id="user" />
          <label>Password</label>
          <input id="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
