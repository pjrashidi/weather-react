import axios from 'axios'

export function registerNewUser (username, password) {
  let newUserData = {
    username: username,
    password: password
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
