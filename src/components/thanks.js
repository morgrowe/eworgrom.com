import React from 'react';

export default function Thanks(props) {
    const componentClass = "thanks";
    return (
        <div className={`${componentClass}__wrapper`} onClick={props.close(true)}>
            <aside className={`${componentClass}`}>
                <button 
                    className={`${componentClass}__close`}
                    onClick={props.close(true)}
                >
                    <span className={`${componentClass}__close-text`}>
                        Close
                    </span>
                    <svg 
                        className={`${componentClass}__close-icon`}
                        viewBox="0 0 32 32"
                    >
                        <use xlinkHref={`#icon-cross`}></use>
                    </svg>
                </button>
                <div className={`${componentClass}__special-thanks`}>
                    <h1 className={`${componentClass}__heading`}>Special Thanks</h1>
                    <p>Weather data sourced from <a href="https://darksky.net/" target="_blank" rel="noopener noreferrer">Dark Sky</a>. City search data from <a href="http://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>. Forward Geocode data by <a href="https://developers.google.com/apis-explorer/" target="_blank" rel="noopener noreferrer">Google APIs</a>. Weather Icons by <a href="http://www.alessioatzeni.com/meteocons/" target="_blank" rel="noopener noreferrer">Alessio Atzeni</a>. Additional icons sourced from <a href="https://icomoon.io/" target="_blank" rel="noopener noreferrer">Icomoon</a>. Fonts by <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">Google Fonts</a>.</p>
                </div>
                <div className={`${componentClass}__technologies`}>
                    <h2 className={`${componentClass}__heading`}>Technologies</h2>
                    <p>Front end was written in <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer">React.js</a>. This is my first project using React. Highly recommend <a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="noopener noreferrer">create-react-app</a>. Backend was written in <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js</a> and hosted on <a href="https://m.do.co/c/cf32a59fc213" target="_blank" rel="noopener noreferrer">DigitalOcean (referal link)</a>.</p>
                </div>
                <div className={`${componentClass}__feedback`}>
                    <h3 className={`${componentClass}__heading`}>Feedback</h3>
                    <p>My website is <a href="https://morgrowe.com/" target="_blank" rel="noopener noreferrer">morgrowe.com</a>.</p>
                </div>
                <div className={`${componentClass}__feedback`}>
                    <h3 className={`${componentClass}__heading`}>App</h3>
                    <p>Current version: <strong>{props.version}</strong></p>
                    <p><strong>0.2</strong>: Fixed windy background image.</p>
                    <p><strong>0.1</strong>: Release.</p>
                </div>
            </aside>
        </div>
    );
}