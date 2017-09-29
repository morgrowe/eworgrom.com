import React from 'react';

export const ErrorMessages = {
    OK: "OK",
    COULD_NOT_CONNECT_TO_API: "Sorry, there was a problem connecting to our API server. Please try again later.",
    GEOLOCATION_FAIL: "Sorry, there was a problem fetching your location. Maybe Location Services have been disabled?",
    NO_CITY_MATCH_FOUND: "We couldn't find a city named:"
}

export default function Error(props) {
    const componentClass = "error-message";
    return (
        <div className={`${componentClass}__wrapper`} onClick={props.close(true)}>
            <div className={componentClass}>
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
                <div className={`${componentClass}__graphic`}>
                    <svg className={`${componentClass}__icon`} viewBox="0 0 32 32">
                        <use xlinkHref="#icon-warning"></use>
                    </svg>
                </div>
                <div className={`${componentClass}__text`}>
                    <span className={`${componentClass}__message`}>{props.message}</span>
                </div>
            </div>
        </div>
    );
}