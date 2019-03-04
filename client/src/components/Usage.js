import React, { Component } from 'react';
import './Usage.css';

class Usage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         charges: "0.00"
    //     }
    // }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    render() {
        const { charges } = this.props;
        return (
            <div id="usage-body">
                <h2>Total charges: <span>$ {charges}</span></h2>
            </div>
        );
    }
}

export default Usage;
