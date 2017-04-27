/* globals google alert */

export function codeAddress (address, callback) {
  var geocoder = new google.maps.Geocoder()
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      console.log('Geocoder results:', results)
      const newGeocode = results
      callback(newGeocode)
    } else {
      alert('Geocode was not successful for the following reason: ' + status)
    }
  })
}
