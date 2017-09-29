import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import './css/style.css';

import Fetch from './utils/fetch';
import GeoLocate from './utils/geolocate';

import Weather from './components/weather';
import LocationSearch from './components/location_search';
import Thanks from './components/thanks';
import Error, { ErrorMessages } from './components/error';
import Tools from './components/tools';

import registerServiceWorker from './js/registerServiceWorker';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationSearchShow: true,
            aboutShow: false,
            error: null,
            locationSearchResults: [],
            locationSearchResultsError: null,
            selectedResult: null,
            weatherLat: null,
            weatherLng: null,
            weatherResults: null,
            version: '0.2'
        };

        //this.locationSearch('london');

        this.geolocate = this.geolocate.bind(this);
        this.handleCitySearchResultSelected = this.handleCitySearchResultSelected.bind(this);
        this.toolLocationSearch = this.toolLocationSearch.bind(this);
        this.toolAbout = this.toolAbout.bind(this);
        this.clearError = this.clearError.bind(this);
        this.clearAbout = this.clearAbout.bind(this);
    }

    locationSearch(query) {
        Fetch.coordsForLocation(query)
            .then(res => {
                let data = [];
                let err;

                if (res.error) {
                    console.log("no results");
                    err = `No results found for "${query}"`;
                    this.setState({
                        err: null,
                        locationSearchResultsError: err
                    })
                    return;
                }

                for (let i = 0; i < res.length; i++) {
                    data.push({
                        name: `${res[i].name}, ${res[i].country}.`,
                        lat: res[i].coord.lat,
                        lng: res[i].coord.lon
                    });
                }

                this.setState({
                    locationSearchResults: data,
                    locationSearchResultsError: null,
                    selectedResult: data[0].name
                });
            })
            .catch(err => {
                this.setState({
                    error: ErrorMessages.COULD_NOT_CONNECT_TO_API
                });
                console.log('err with data being passed', err, this.state.error);
            });
    }

    geolocate() {
        // Attempt to get user's lat/lng from the browser
        // If successful, pass results to state and fetch new
        // weather data

        GeoLocate((res) => {
            if (res.err) {
                this.setState({
                    error: ErrorMessages.GEOLOCATION_FAIL
                });
            } else {
                Fetch.locationForCoords(res.lng, res.lat)
                    .then((res) => {
                        this.setState({ 
                            locationSearchShow: false,
                            selectedResult: res.name,
                            weatherLat: res.lat,
                            weatherLng: res.lng
                        }, this.getWeather);
                    })
                    .catch((err) => {
                        this.setState({
                            error: ErrorMessages.GEOLOCATION_FAIL
                        });
                        console.log('error', err);
                    });
            }
        });  
    }

    getWeather() {
        Fetch.weatherForCoords(this.state.weatherLat, this.state.weatherLng)
            .then((res) => {
                this.setState({ weatherResults: res });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCitySearchResultSelected(result) {
        this.setState({
            locationSearchShow: false,
            selectedResult: result.name,
            weatherLat: result.lat,
            weatherLng: result.lng
        }, this.getWeather);  
    }

    renderErrorMessage() {
        if (this.state.error) {
            return <Error message={this.state.error} close={() => this.clearError} />
        } else {
            return null;
        }
    }

    renderLocationSearch() {
        const locationSearchDebounced = debounce((query) => {this.locationSearch(query)}, 500);
        if (this.state.locationSearchShow) {
            return (
                <LocationSearch 
                    onSearchResultChange={locationSearchDebounced}
                    autoLocateRequest={this.geolocate}
                    onResultSelect={this.handleCitySearchResultSelected}
                    results={this.state.locationSearchResults}
                    error={this.state.locationSearchResultsError}
                />
            );
        } else {
            return null;
        }
    }
    
    renderAbout() {
        if (this.state.aboutShow) {
            return (
                <Thanks 
                    close={() => this.clearAbout}
                    version={this.state.version}
                />
            )
        } else {
            return null;
        }
        
    }

    clearAbout() {
        this.setState({
            aboutShow: false
        });
    }

    clearError() {
        this.setState({
            error: null
        });
    }

    toolLocationSearch() {
        if ((this.state.locationSearchShow) && (this.state.weatherResults)) {
            this.setState({
                locationSearchShow: false
            });
        } else {
            this.setState({
                locationSearchShow: true
            });
            window.scrollTo(0,0);
        }
    }

    toolAbout() {
        if (this.state.aboutShow) {
            this.setState({
                aboutShow: false
            });
        } else {
            this.setState({
                aboutShow: true
            });
            window.scrollTo(0,0);
        }
    }

    renderTools() {
        if (!this.state.weatherResults) {
            return null;
        }

        return (
            <Tools 
                onLocationSearchClick={this.toolLocationSearch}
                onAboutClick={this.toolAbout}
                show={this.state.locationSearchShow}
            />
        );
    }
    
    render() {

        return (
            <div className="app-container">
                {this.renderErrorMessage()}
                {this.renderLocationSearch()}
                {this.renderAbout()}
                <Weather 
                    results={this.state.weatherResults}
                    locationName={this.state.selectedResult}
                />
                {this.renderTools()}                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();