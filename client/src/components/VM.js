import React, { Component } from 'react';
import './VM.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';

class VM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsOpen: false,
            charges: 0.00
        }
    }

    componentDidMount() {
        this.refresh();
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

    refresh = () => {
        let charges = 0.00;
        let vmCharge = 0.00;
        let tier = this.props.tier;
        if (this.props.usage.length !== 0) {
            this.props.usage.forEach((use) => {
                let endTime = use.endTime !== null ? use.endTime : Date.now();
                let duration = moment.duration(moment(endTime).diff(moment(use.startTime))).asMinutes();
                vmCharge += duration * (tier === 1 ? 0.05 : (tier === 2 ? 0.1 : 0.15));
            });
        }
        charges += vmCharge;
        this.setState({
            charges: Math.round(charges * 100) / 100
        });

    };

    render() {
        // TODO have up/downgrade buttons and disable if highest/lowest tier
        // TODO disable scale if running
        const { _id, name, creationDate, tier, running, usage } = this.props;

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
                <p><strong>Creation time:</strong> {moment(creationDate).format("DD MMMM YYYY, h:mm:ss a")}</p>
                <div className="usage-group"><p><strong>Charge per VM:</strong> $ {this.state.charges}</p><button className="refresh-button" onClick={this.refresh}>refresh</button></div>
                <div id="vm-upgrade-group" className="vm-button-group">
                    <Button classes={{ root: 'vm-button upgrade-button' }} onClick={this.handleDowngrade} disabled={running}>
                        Downgrade
                    </Button>
                    <Button classes={{ root: 'vm-button upgrade-button' }} onClick={this.handleUpgrade} disabled={running}>
                        Upgrade
                    </Button>
                </div>
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
                            <h2>{name} <span>details</span></h2>
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