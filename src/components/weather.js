import React, { Component } from 'react';

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            detail: [],
            active: ''
        });

        this.renderHourlyResults = this.renderHourlyResults.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.renderDailySummaries = this.renderDailySummaries.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
    }

    render() {
        const componentClass = "weather",
            nowClass = `${componentClass}__now`,
            hourlyClass = `${componentClass}__hourly`,
            dailyClass = `${componentClass}__daily`;

        if (!this.props.results) {
            return null;
        }

        return (
            <div className={`${componentClass}`}>
                <div className={`${componentClass}__main-wrapper`}>
                    <div className={`${componentClass}__now-hourly-wrapper`}>
                        <div className={`${nowClass}`}>
                            {this.renderNowSummary(nowClass)}
                        </div>
                        <div className={`${hourlyClass}`}>
                            <ul className={`${hourlyClass}__list`}>
                                {this.renderHourlyResults(hourlyClass)}
                            </ul>
                        </div>
                    </div>
                    {this.renderHourlyDetail(componentClass)}
                    <div className={`${dailyClass}`}>
                        <ul className={`${dailyClass}__list`}>
                            {this.renderDailySummaries(dailyClass)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    
    pad(input) {
        // if the input is less than 10, prepend a 0 to it
        return input < 10 ? "0" + input : input;
    }

    epochToHHMM(input) {
        // Converts epoch/UNIX time to HH:MM

        const date = new Date(input * 1000),
            hours = date.getHours(),
            mins = date.getMinutes();

        return `${this.pad(hours)}:${this.pad(mins)}`;
    }

    weatherGraphicID(input) {
        // Takes some of the various icon types and converts them into
        // the graphics/icons we have resources for

        switch (input) {
            case "clear-day": return "clear-day";
            case "clear-night": return "clear-night";
            case "partly-cloudy-day": return "partly-cloudy-day";
            case "partly-cloudy-night": return "partly-cloudy-night";
            case "cloudy": return "cloudy";
            case "rain": return "rain";
            case "thunderstorm": return "thunderstorm";
            case "tornado": return "tornado";
            case "snow": return "snow";
            case "sleet": return "snow";
            case "hail": return "snow";
            case "fog": return "fog";
            case "wind": return "windy";
            default: return "0000";
        }
    }

    epochToDay(input, displayLong) {
        const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const longDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        // Converts epoch/UNIX time to the day

        const date = new Date(input * 1000),
            dayNo = date.getDay();
        let day;

        if (displayLong) {
            day = longDays[dayNo];
        } else {
            day = shortDays[dayNo];
        }

        return day;
    }

    handleOnClick(event) {
        if ((!event.key) || (event.key === 'Enter') || (event.key === ' ')) {
            const data = this.props.results.hourly.data;
            const timeStamp = event.target.getAttribute('data-time').toString();

            for (let i = 0; i < data.length; i++) {
                if (data[i].time.toString() === timeStamp) {
                    this.setState({
                        detail: [
                            {
                                data: data[i]
                            }
                        ]
                    });
                }
            }
        }
    }

    handleCloseButton(event) {
        this.setState({
            detail: []
        });
    }

    renderNowSummary(nowClass) {
        const result = this.props.results.daily.data[0];
        const tempMax = Math.round(result.temperatureMax);
        const tempMin = Math.round(result.temperatureMin);

        return (
            <ul className={`${nowClass}__list weather-graphic weather-graphic--${this.weatherGraphicID(result.icon)}`}>
                <li className={`${nowClass}__list-item__header-bar`}>
                    <ul className={`${nowClass}__list-item__header-bar__list`}>
                        <li className={`${nowClass}__list-item__header-bar__list-item`}>{this.props.locationName}</li>
                        <li className={`${nowClass}__list-item__header-bar__list-item`}>{this.epochToDay(result.time, true)}</li>   
                    </ul>
                </li>
                <li className={`${nowClass}__list-item__footer-bar`}>
                    <ul className={`${nowClass}__list-item__footer-bar__list`}>
                        <li className={`${nowClass}__list-item__footer-bar__list-item`}>Sunrise: {this.epochToHHMM(result.sunriseTime)}</li>
                        <li className={`${nowClass}__list-item__footer-bar__list-item`}>Sunset: {this.epochToHHMM(result.sunsetTime)}</li>   
                    </ul>
                </li> 
                <li className={`${nowClass}__list-item__location`}>{this.props.locationName}</li>            
                <li className={`${nowClass}__list-item__temp`}>
                    <span className={`${nowClass}__list-item__tempMax`}>{tempMax}</span>
                    <span className={`${nowClass}__list-item__tempMin`}>{tempMin}</span>
                </li>
                <li className={`${nowClass}__list-item__summary`}>{result.summary}</li>
                 
            </ul>
        );
    }

    renderHourlyDetail(componentClass) {
        if (this.state.detail.length > 0) {
            const hourlyDetail = `${componentClass}__daily-details`;
            const weather = this.state.detail[0].data;

            return (
                <div onClick={this.handleCloseButton} className={`${hourlyDetail}__wrapper`}>
                    <div className={`${hourlyDetail}`}>
                        <button 
                            className={`${hourlyDetail}__close`}
                            onClick={this.handleCloseButton}
                        >
                            <span className={`${hourlyDetail}__close-text`}>
                                Close
                            </span>
                            <svg 
                                className={`${hourlyDetail}__close-icon`}
                                viewBox="0 0 32 32"
                            >
                                <use xlinkHref={`#icon-cross`}></use>
                            </svg>
                        </button>
                        <table className={`${hourlyDetail}__table`}>
                            <thead>
                                <tr>
                                    <th className={`${hourlyDetail}__table__header`} colSpan="2">{this.epochToHHMM(weather.time)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Summary</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.summary}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Percip. Instensity</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.precipIntensity.toFixed(2)} mm/h</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Percip. Probability</td>
                                    <td className={`${hourlyDetail}__table__value`}>{Math.floor(weather.precipProbability * 100)}%</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Temperature</td>
                                    <td className={`${hourlyDetail}__table__value`}><span className={`${hourlyDetail}__table__value__temp`}>{weather.apparentTemperature}</span></td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Cloud Cover</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.cloudCover}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Dew Point</td>
                                    <td className={`${hourlyDetail}__table__value`}><span className={`${hourlyDetail}__table__value__dew-point`}>{weather.dewPoint}</span></td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Humidity</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.humidity}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Ozone</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.ozone}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Pressure</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.pressure} hPa</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>UV Index</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.uvIndex}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Visibility</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.visibility}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Wind Bearing</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.windBearing}</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Wind Gust</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.windGust} m/s</td>
                                </tr>
                                <tr>
                                    <td className={`${hourlyDetail}__table__desc`}>Wind Speed</td>
                                    <td className={`${hourlyDetail}__table__value`}>{weather.windSpeed} m/s</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderHourlyResults(hourlyClass) {
        return this.props.results.hourly.data.map(result => {
            return (
                <li
                    key={result.time}
                    onClick={this.handleOnClick}
                    onKeyPress={this.handleOnClick}
                    data-time={result.time}
                    className={`${hourlyClass}__list-item`}
                    role='button'
                    tabIndex='0'
                    aria-labelledby={this.epochToHHMM(result.time)}
                    aria-pressed='false'
                >
                    <ul
                        className={`${hourlyClass}__list-item__list`} 
                        data-time={result.time}
                    >
                        <li data-time={result.time} className={`${hourlyClass}__list-item__list__list-item`} id={this.epochToHHMM(result.time)}>{this.epochToHHMM(result.time)}</li>
                        <li data-time={result.time} className={`${hourlyClass}__list-item__list__list-item`}>
                            <svg data-time={result.time} className={`${hourlyClass}__list-item__list__icon`} viewBox="0 0 32 32">
                                <use data-time={result.time} xlinkHref={`#icon-${this.weatherGraphicID(result.icon)}`}></use>
                            </svg>
                        </li>
                        <li data-time={result.time} className={`${hourlyClass}__list-item__list__temp`}>{Math.round(result.apparentTemperature)}</li>                    
                    </ul>
                </li>
            ); 
        })
    }

    renderDailySummaries(dailyClass) {
        return this.props.results.daily.data.map(result => {
            const temp = Math.round(result.temperatureMax);

            return (
                <li
                    className={`${dailyClass}__list-item`}
                    key={result.time}
                >
                    <ul className={`${dailyClass}__list-item__list`}>
                        <li className={`${dailyClass}__list-item__list__day`}>{this.epochToDay(result.time)}</li>
                        <li className={`${dailyClass}__list-item__list__icon`}>
                            <svg data-time={result.time} className={`${dailyClass}__list-item__list__icon`} viewBox="0 0 32 32">
                                <use data-time={result.time} xlinkHref={`#icon-${this.weatherGraphicID(result.icon)}`}></use>
                            </svg></li>
                        <li className={`${dailyClass}__list-item__list__temp`}>{temp}</li>               
                    </ul>
                </li>
            ); 
        });
    }

        
}