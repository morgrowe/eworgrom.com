import React, { Component } from 'react';

export default class LocationSearch extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };

        this.handleAutoLocate = this.handleAutoLocate.bind(this);
    }

    render() {
        const componentClass = "location-search";
        const labelClass = `${componentClass}__label`;
        const resultsClass = `${componentClass}__results`;
        return (
            <div className={`${componentClass}`}>
                <h1 className={`${componentClass}__header`}>City Search</h1>

                <p className={`${componentClass}__info`}>Where would you like weather information for?</p>

                <button className={`${componentClass}__auto-button`} onClick={this.handleAutoLocate}>Current Location</button>
                
                <p className={`${componentClass}__info`}>Or a specific city:</p>

                <form onSubmit={this.handleOnSubmit} className={`${componentClass}__form`}>
                    <label
                        className={`${labelClass}`}
                        htmlFor="locationSearch"
                    >
                        <span 
                            className={`${labelClass}__text`}
                            aria-hidden="true"
                        >
                            Search
                        </span> 
                        <svg
                            className={`${labelClass}__icon`}
                            viewBox="0 0 32 32"
                        >
                            <use xlinkHref="#icon-search"></use>
                        </svg> 
                    </label>
                    <input
                        className={`${componentClass}__input`}
                        value={this.state.term}
                        onChange={this.handleSearch}
                        id="locationSearch" />
                </form>

                {this.renderSearchResults(resultsClass)}

            </div>
        );
    }

    renderSearchResults(resultsClass) {
        let searchResults;
        let componentClass = resultsClass;

        if (this.props.error) {
            return (
                <div className={`${resultsClass}`}>
                    <h2 className={`${resultsClass}__header`}>Results</h2>
                    <ul className={`${componentClass}__list`}>
                        <li className={`${componentClass}__list__error`}>No results found.</li>
                    </ul>
                </div>
            );
        }

        if (this.props.results.length > 0) {
            searchResults = this.props.results.map((searchResult) => {
                return this.renderSearchResultItem(searchResult, resultsClass);
            });

            return (
                <div className={`${resultsClass}`}>
                    <h2 className={`${resultsClass}__header`}>Results</h2>
                    <ul className={`${componentClass}__list`}>{searchResults}</ul>
                </div>
            );
        }        
    }

    renderSearchResultItem(searchResult, resultsClass) {
        // show search results to the user. the name of the city and its lat and lng
        // are passed in
        const { name, lat, lng } = searchResult;
        return (
            <li 
                className={`${resultsClass}__list-item`}
                key={name + lat + lng}
                onClick={() => this.props.onResultSelect(searchResult)}
            >
                <button
                    className={`${resultsClass}__button`}
                    data-lat={lat}
                    data-lng={lng}
                    title={"Lat: " + lat + ", Lng: " + lng}
                >
                    {name}
                </button>
            </li>
        ); 
    }

    handleOnSubmit(event) {
        event.preventDefault();
    }

    handleSearch = (event) => {
        event.preventDefault();
        const query = event.target.value;
        this.setState({ term: query });
        this.props.onSearchResultChange(query);
    }

    handleAutoLocate = (event) => {
        event.preventDefault();
        this.props.autoLocateRequest(true);
    }

}