import React from 'react';

export default function Tools(props) {
    const componentClass = "tools";
    return (
        <nav className={`${componentClass}`}>
            <ul className={`${componentClass}__list`}>
                <li className={`${componentClass}__list-item`}>
                    <button 
                        className={`${componentClass}__button`}
                        onClick={() => props.onLocationSearchClick()}
                    >
                        <span className={`${componentClass}__text`}>City Search</span>
                        <svg className={`${componentClass}__icon`} viewBox="0 0 32 32">
                            <use xlinkHref="#icon-location"></use>
                        </svg>
                    </button>
                </li>
                <li className={`${componentClass}__list-item`}>
                    <button 
                        className={`${componentClass}__button`}
                        onClick={() => props.onAboutClick()}
                    >
                        <span className={`${componentClass}__text`}>About</span>
                        <svg className={`${componentClass}__icon`} viewBox="0 0 32 32">
                            <use xlinkHref="#icon-info"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
} 