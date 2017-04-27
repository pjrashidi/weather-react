/* globals google alert */

export function codeAddress (address, callback) {
  var geocoder = new google.maps.Geocoder()
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      console.log('Geocoder results:', results)
      const newCoordinates = `${results[0].geometry.location.lat()},${results[0].geometry.location.lng()}`
      callback(newCoordinates)
    } else {
      alert('Geocode was not successful for the following reason: ' + status)
    }
  })
}
