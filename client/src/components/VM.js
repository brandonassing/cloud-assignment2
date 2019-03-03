import React, { Component } from 'react';
import './VM.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';

class VM extends Component {
    constructor (props) {
        super(props);
        this.state = {
            started: false
        }
    }
    render() {
        const { name, startTime } = this.props;
        return (
            <div className="vm-body">
                <h2 className="vm-title">{name}</h2>
                <p><strong>Start time:</strong> {moment(startTime).format("DD MMMM YYYY, h:mm:ss a")}</p>
                <div className="usage-group"><p><strong>Usage:</strong> 50%</p><button className="refresh-button">refresh</button></div>
                <div className="vm-button-group">
                    <Button classes={{ root: 'vm-button start-button' }} variant="outlined">
                        {!this.state.started ? "Start" : "Stop"}
                    </Button>
                    <Button classes={{ root: 'vm-button delete-button' }} variant="outlined">
                        Delete
                    </Button>
                </div>
            </div>

        );
    }
}

export default VM;