import axios from 'axios'

export function registerNewUser (username, password, callback) {
  let registerCredentials = {
    username: username,
    password: password
  }
  axios
    .get(
      `http://localhost:3000/mongodb/registerNew/${JSON.stringify(registerCredentials)}`
    )
    .then(response => {
      console.log(response.data)
      let { username, password, userAvailable } = response.data
      let alertMessage = ''
      if (username && !userAvailable) {
        alertMessage += 'username already taken\n'
      }
      if (!username) alertMessage += 'please input username\n'
      if (!password) alertMessage += 'please input password\n'
      if (username && password && userAvailable) {
        alertMessage += `new user ${username} registered\n`
        callback()
      }
      window.alert(alertMessage)
    })
    .catch(error => {
      console.log(error)
    })
}
