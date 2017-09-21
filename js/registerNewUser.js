import axios from 'axios'

export function registerNewUser (username, password) {
  let newUserData = {
    username: username,
    password: password
  }
  axios
    .get(
      `http://localhost:3000/mongodb/registerNew/${JSON.stringify(newUserData)}`
    )
    .then(response => {
      let alertMessage = ''
      if (!response.data.username) alertMessage += 'please input username\n'
      if (!response.data.password) alertMessage += 'please input password\n'
      if (response.data.username && !response.data.userAvailable) {
        alertMessage += 'username already taken\n'
      }
      if (response.data.username && response.data.userAvailable) {
        alertMessage += 'new user registered\n'
      }
      window.alert(alertMessage)
    })
    .catch(error => {
      console.log(error)
    })
}
