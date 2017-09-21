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
      let{username, password, userExists, passwordCorrect} = response.data
      let alertMessage = ''
      if (username && !userExists) {
        alertMessage += 'that user does not exist, please register\n'
      }
      if (!username) alertMessage += 'please input username\n'
      if (!password) alertMessage += 'please input password\n'
      if (password && userExists && !passwordCorrect) alertMessage += 'wrong password\n'
      if (userExists && passwordCorrect) {
        alertMessage += 'logged in as ' + username
        callback()
      }
      window.alert(alertMessage)
    })
    .catch(error => {
      console.log(error)
    })
}
