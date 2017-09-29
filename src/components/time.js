import React, { Component } from 'react';

export default class Time extends Component {
    constructor(props) {
        super(props)
        
        this.state = { 
            time: this.currentTime()
        }; 
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <p><strong>{this.state.time}</strong></p>
        );
    }

    currentTime() {
        const date = new Date();
        const hours = ("0" + date.getHours()).slice(-2);
        const mins = ("0" + date.getMinutes()).slice(-2);
        return `${hours}:${mins}`;
    }

    tick() {
        if(this.currentTime() !== this.state.time) {
            this.setState({
                time: this.currentTime()
            });
        }
    }
    
}