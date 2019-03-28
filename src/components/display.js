import React, { Component } from 'react';

class Display extends Component {

    render() {
        return (
            <h1 className={`${this.props.className} display`}>{this.props.value}</h1>
        );
    }
}
export default Display;