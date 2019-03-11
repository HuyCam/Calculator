import React, { Component } from 'react';

class Display extends Component {

    render() {
        return (
            <h1 className={this.props.className}>{this.props.value}</h1>
        );
    }
}
export default Display;