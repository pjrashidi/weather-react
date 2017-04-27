import axios from 'axios'

export function getForecast (geocode, callback) {
  let coordinates
  coordinates = `${geocode[0].geometry.location.lat()},${geocode[0].geometry.location.lng()}`
  axios.get(`http://localhost:3000/forecast/${coordinates}`)
    .then((response) => {
      console.log('success', response.data)
      callback(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
