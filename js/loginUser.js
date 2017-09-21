import axios from 'axios'

export function loginUser (username, password, callback) {
  let loginUserData = {
    username: username,
    password: password
  }
  axios
    .get(`http://localhost:3000/mongodb/login/${JSON.stringify(loginUserData)}`)
    .then(response => {
      console.log(response.data)
      let alertMessage = ''
      if (response.data.username && !response.data.userExists) {
        alertMessage += 'that user does not exist, please register\n'
      }
      if (!response.data.username) alertMessage += 'please input username\n'
      if (!response.data.password) alertMessage += 'please input password\n'
      if (response.data.userExists && response.data.passwordCorrect) {
        alertMessage += 'logged in as ' + response.data.username
        callback()
      }
      window.alert(alertMessage)
    })
    .catch(error => {
      console.log(error)
    })
}
