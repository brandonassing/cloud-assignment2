import React, { Component } from 'react';
import './VM.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';

class VM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // running: false,
            // tier: 0
            detailsOpen: false
        }
    }

    handleOpen = () => {
        this.setState({ detailsOpen: true });
    };

    handleClose = () => {
        this.setState({
            detailsOpen: false
        });
    };

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

        let vmMetadata = (
            <div>
                <p><strong>id: </strong>{_id}</p>
                <hr></hr>
            </div>
        );
        let tierDescription;
        if (tier === 1) {
            tierDescription = (
                <div>
                    {vmMetadata}
                    <p>8 virtual processor cores</p>
                    <p>16 GB of virtual RAM</p>
                    <p>20 GB of storage space in the root file system</p>
                    <p>$0.05/minute</p>
                </div>
            )
        }
        else if (tier === 2) {
            tierDescription = (
                <div>
                    {vmMetadata}
                    <p>32 virtual processor cores</p>
                    <p>64 GB of virtual RAM</p>
                    <p>20 GB of storage space in the root file system</p>
                    <p>$0.10/minute</p>
                </div>
            )
        }
        else if (tier === 3) {
            tierDescription = (
                <div>
                    {vmMetadata}
                    <p>128 virtual processor cores</p>
                    <p>512 GB of virtual RAM</p>
                    <p>40 GB of storage space in the root file system</p>
                    <p>$0.15/minute</p>
                </div>
            )
        }

        return (
            <div className="vm-body">
                <h2 className="vm-title">{name} <span>- {tier === 1 ? "Basic" : (tier === 2 ? "Large" : "Ultra-large")}</span></h2>
                <button className="details-button" onClick={() => this.setState({ detailsOpen: true })}>more details</button>
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
                <Modal
                    aria-labelledby="details-modal-title"
                    aria-describedby="details-modal-description"
                    open={this.state.detailsOpen}
                    onClose={this.handleClose}
                >
                    <div id="details-modal-body">
                        <div id="details-modal-content">
                            <h2>{name} details</h2>
                            {
                                tier !== 0 ? (
                                    <div id="vm-description">
                                        {tierDescription}
                                    </div>)
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default VM;