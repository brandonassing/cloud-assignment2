import React, { Component } from 'react';
import './VM.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';

class VM extends Component {
    constructor (props) {
        super(props);
        this.state = {
            running: false,
            tier: 0
        }
    }

    componentDidMount() {
        // TODO get VM running state and tier
    }

    handleStartStop = () => {
    };

    handleUpgrade = () => {

    };

    handleDowngrade = () => {

    };

    handleDelete = () => {
        this.props.delete(this.props._id);
    };

    render() {
        // TODO get tier from state instead of props
        const { _id, name, startTime, tier } = this.props;
        return (
            <div className="vm-body">
                <h2 className="vm-title">{name} <span>- {tier === 1 ? "Basic" : (tier === 2 ? "Large" : "Ultra-large")}</span></h2>
                <p><strong>Start time:</strong> {moment(startTime).format("DD MMMM YYYY, h:mm:ss a")}</p>
                <div className="usage-group"><p><strong>Usage:</strong> 50%</p><button className="refresh-button">refresh</button></div>
                <div className="vm-button-group">
                    <Button classes={{ root: 'vm-button start-button' }} onClick={this.handleStartStop}>
                        {!this.state.running ? "Start" : "Stop"}
                    </Button>
                    <Button classes={{ root: 'vm-button delete-button' }} onClick={this.handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>

        );
    }
}

export default VM;