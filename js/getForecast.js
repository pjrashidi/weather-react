import axios from 'axios'

export function getForecast (coordinates, callback) {
  axios.get(`http://localhost:3000/forecast/${coordinates}`)
    .then((response) => {
      console.log('success', response.data)
      callback(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
