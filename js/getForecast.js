import axios from 'axios'

export function getForecast (geocode, callback) {
  const coordinates = `${geocode[0].geometry.location.lat()},${geocode[0].geometry.location.lng()}`
  axios
    .get(`http://localhost:3000/forecast/${coordinates}`)
    .then(response => {
      console.log('success', response.data)
      let newForecast = {forecast: response.data}
      callback(newForecast)
    })
    .catch(error => {
      console.log(error)
    })
}
