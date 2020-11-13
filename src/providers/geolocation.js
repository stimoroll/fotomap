const geoLocation = (callback) => {

  let status = null;

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    status = 'sucess';
    callback(latitude, longitude);
  }

  function error() {
    status = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status = 'Geolocation is not supported by your browser';
  } else {
    status = 'Locating…';
    try {
      navigator.geolocation.getCurrentPosition(success, error);
    } catch (error) {
      status = error.toString();
    }
  }

}

export default geoLocation;