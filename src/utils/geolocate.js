export default function GeoLocate(callback) {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    function success(pos) {
        callback({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        });
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        /*callback({
            lat: 51.515419,
            lng: -0.141099,
            err: true
        });*/
        callback({
            err: true
        });
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        console.warn("Geolocation isn't supported by your browser");
    }
}