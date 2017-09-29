import { get } from 'axios';

const Fetch = {
    weatherForCoords: function(lat, lng) {
        // get weather data for the given lat/lng coords.
        // pass lat/lng coords for London if no values are passed.

        const pLat = parseFloat(lat, 10) || parseFloat(51.515419, 10);
        const pLng = parseFloat(lng, 10) || parseFloat(-0.141099, 10);

        return _get(_url('weatherForCoords', pLat, pLng));
    },
    locationForCoords: function(lng, lat) {
        // get the location name from the given lat/lng coords.
        // pass lat/lng coords for London if no values are passed.

        const pLat = parseFloat(lat, 10) || parseFloat(51.515419, 10);
        const pLng = parseFloat(lng, 10) || parseFloat(-0.141099, 10);

        return _get(_url('locationForCoords', pLat, pLng));
    },
    coordsForLocation: function(placeName) {
        // get the coords for a given city name. If no city name is passed,
        // use London as the default
        
        const pPlaceName = placeName.toString() || 'london';

        return _get(_url('coordsForLocation', pPlaceName, null));
    }
}

function _get(url) {
    return get(url)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        });
}

function _url(type, arg1, arg2) {
    const BASE_URL = 'https://eworgrom.com/api?';

    if (type === "coordsForLocation") {
        return window.encodeURI(`${BASE_URL}data=coordsForLocation&selectedResult=${arg1}`);
    } else if (type === "locationForCoords" ) {
        return window.encodeURI(`${BASE_URL}&data=locationForCoords&lat=${arg1}&lon=${arg2}`);
    } else if (type === "weatherForCoords") {
        return window.encodeURI(`${BASE_URL}data=weatherForCoords&lat=${arg1}&lon=${arg2}`);
    } else {
        return;
    }
}

export default Fetch;