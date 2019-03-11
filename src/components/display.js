import React, { Component } from 'react';

class Display extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <h1 className={this.props.className}>{this.props.value}</h1>
        );
    }
}
export default Display;