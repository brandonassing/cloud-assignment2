import React, { Component } from 'react';
import './VM.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';

class VM extends Component {
    constructor (props) {
        super(props);
        // this.state = {
        //     running: false,
        //     tier: 0
        // }
    }

    handleStartStop = () => {
        this.props.startStop(this.props._id, this.props.running);
    };

    handleUpgrade = () => {
        this.props.upgrade(this.props._id);
    };

    handleDowngrade = () => {
        this.props.downgrade(this.props._id);
    };

    handleDelete = () => {
        this.props.delete(this.props._id);
    };

    render() {
        // TODO have up/downgrade buttons and disable if highest/lowest tier
        const { _id, name, startTime, tier, running } = this.props;
        return (
            <div className="vm-body">
                <h2 className="vm-title">{name} <span>- {tier === 1 ? "Basic" : (tier === 2 ? "Large" : "Ultra-large")}</span></h2>
                <p><strong>Start time:</strong> {moment(startTime).format("DD MMMM YYYY, h:mm:ss a")}</p>
                <div className="usage-group"><p><strong>Usage:</strong> 50%</p><button className="refresh-button">refresh</button></div>
                <div className="vm-button-group">
                    <Button classes={{ root: 'vm-button start-button' }} onClick={this.handleStartStop}>
                        {!running ? "Start" : "Stop"}
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