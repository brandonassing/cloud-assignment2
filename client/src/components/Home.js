import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import VM from './VM';
import Usage from './Usage';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createOpen: false,
            anchorEl: null,
            vmName: "",
            vmTier: 0,
            charges: 0.00,
            vms: [{
                _id: "1234",
                name: "My VM 1",
                creationDate: new Date('October 20, 2018 9:24:00'),
                tier: 1,
                running: true,
                usage: [{
                    startTime: new Date('October 20, 2018 10:24:00'),
                    endTime: new Date('October 20, 2018 14:28:00')
                }, {
                    startTime: new Date('March 4, 2019 12:24:00'),
                    endTime: null
                }]
            },
            {
                _id: "1235",
                name: "VM2",
                creationDate: new Date('November 12, 2018 19:23:21'),
                tier: 3,
                running: false,
                usage: [{
                    startTime: new Date('October 20, 2018 10:24:00'),
                    endTime: new Date('October 20, 2018 14:28:00')
                }, {
                    startTime: new Date('October 23, 2018 12:24:00'),
                    endTime: new Date('October 25, 2018 14:28:00')
                }]
            },
            {
                _id: "1236",
                name: "Something vm 3",
                creationDate: new Date('January 28, 2019 12:00:39'),
                tier: 2,
                running: true,
                usage: [{
                    startTime: new Date('March 2, 2019 11:39:23'),
                    endTime: null
                }]
            },
            {
                _id: "1237",
                name: "My VM 4",
                creationDate: new Date('March 1, 2019 13:24:00'),
                tier: 1,
                running: false,
                usage: []
            },
            {
                _id: "1238",
                name: "My VM 5",
                creationDate: new Date('March 1, 2019 13:24:00'),
                tier: 1,
                running: false,
                usage: []
            },
            {
                _id: "1239",
                name: "My VM 6",
                creationDate: new Date('March 1, 2019 13:24:00'),
                tier: 2,
                running: false,
                usage: []
            },
            {
                _id: "1240",
                name: "My VM 7",
                creationDate: new Date('March 1, 2019 13:24:00'),
                tier: 3,
                running: false,
                usage: []
            }]
        }
    }

    componentDidMount() {
        
        this.refresh();
    }

    refresh = () => {
        if (this.state.vms.length !== 0) {
            let charges = 0.00;
            this.state.vms.forEach((vm) => {
                let vmCharge = 0.00;
                let tier = vm.tier;
                if (vm.usage.length !== 0) {
                    vm.usage.forEach((use) => {
                        let endTime = use.endTime !== null ? use.endTime : Date.now();
                        let duration = moment.duration(moment(endTime).diff(moment(use.startTime))).asMinutes();
                        vmCharge += duration * (tier === 1 ? 0.05 : (tier === 2 ? 0.1 : 0.15));
                    });
                }
                charges += vmCharge;
            });
            this.setState({
                charges: Math.round(charges*100)/100
            });
        }
    };

    handleNameChange = (e) => {
        this.setState({
            vmName: e.target.value
        });
    };

    handleOpen = () => {
        this.setState({ createOpen: true });
    };

    handleClose = () => {
        this.setState({
            createOpen: false,
            vmName: "",
            vmTier: 0
        });
    };

    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = (e) => {
        this.setState({
            anchorEl: null,
            vmTier: !!e.target.value ? e.target.value : this.state.vmTier
        });
    };

    createVM = () => {
        this.setState({
            createOpen: false,
            vmName: "",
            vmTier: 0
        });
    };

    startStop = (id, running) => {
        if (running) {
            console.log("Stopping " + id);
        }
        else {
            console.log("Starting " + id);
        }
    };

    delete = (id) => {
        console.log('delete ' + id);
    };

    upgrade = (id) => {
        console.log('upgrade ' + id);
    };

    downgrade = (id) => {
        console.log('downgrade ' + id);
    };

    render() {
        // TODO only show VM for user that created
        let tierDescription;
        if (this.state.vmTier === 1) {
            tierDescription = (
                <div>
                    <p>8 virtual processor cores</p>
                    <p>16 GB of virtual RAM</p>
                    <p>20 GB of storage space in the root file system</p>
                    <p>$0.05/minute</p>
                </div>
            )
        }
        else if (this.state.vmTier === 2) {
            tierDescription = (
                <div>
                    <p>32 virtual processor cores</p>
                    <p>64 GB of virtual RAM</p>
                    <p>20 GB of storage space in the root file system</p>
                    <p>$0.10/minute</p>
                </div>
            )
        }
        else if (this.state.vmTier === 3) {
            tierDescription = (
                <div>
                    <p>128 virtual processor cores</p>
                    <p>512 GB of virtual RAM</p>
                    <p>40 GB of storage space in the root file system</p>
                    <p>$0.15/minute</p>
                </div>
            )
        }
        return (
            <div id="home-body">
                <nav>
                    <div id="nav-wrapper">
                        <h1 id="nav-heading">vee em.</h1>
                        <div id="logout-button-wrapper">
                            <button id="refresh-button-main" className="refresh-button" onClick={this.refresh}>refresh</button>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button classes={{ root: 'logout-button' }} variant="outlined">
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div id="home-main">
                    <Usage charges={this.state.charges} />
                    <div id="home-grid">
                        {/* <div id="create-button-container" className="vm-body">
                        <Button classes={{ root: 'create-button' }}>
                            <div id="vm-create">
                                <h2 id="plus-symbol">
                                    +
                                </h2>
                                <h2 id="create-text">
                                    Create
                                </h2>
                            </div>
                        </Button>
                    </div> */}
                        <div id="vm-create" className="vm-body" onClick={this.handleOpen}>
                            <h2 id="plus-symbol">
                                +
                        </h2>
                            <h2 id="create-text">
                                Create new VM
                        </h2>
                        </div>
                        {
                            this.state.vms.map((item) => {
                                return (
                                    <VM key={item._id} _id={item._id} name={item.name} creationDate={item.creationDate} tier={item.tier} running={item.running} usage={item.usage} startStop={this.startStop} delete={this.delete} upgrade={this.upgrade} downgrade={this.downgrade} />
                                )
                            })
                        }
                    </div>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.createOpen}
                    onClose={this.handleClose}
                >
                    <div id="modal-body">
                        <div id="modal-content">
                            <h2>Configure VM</h2>
                            <TextField
                                id="vm-name"
                                label="Name"
                                value={this.state.vmName}
                                onChange={this.handleNameChange}
                                margin="normal"
                                variant="filled"
                                type="text"
                                fullWidth={true}
                            />
                            <div id="tier-dropdown">
                                <Button
                                    aria-owns={this.state.anchorEl ? 'tier-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuClick}
                                    classes={{ root: 'tier-button' }}
                                >
                                    {this.state.vmTier === 0 ? "Select tier" : (this.state.vmTier === 1 ? "Server tier: Basic" : (this.state.vmTier === 2 ? "Server tier: Large" : "Server tier: Ultra-large"))}
                                </Button>
                                <Menu
                                    id="tier-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleMenuClose} value={1}>Basic virtual server instance</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose} value={2}>Large virtual server instance</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose} value={3}>Ultra-large virtual server instance</MenuItem>
                                </Menu>
                                {
                                    this.state.vmTier !== 0 ? (
                                        <div id="tier-description">
                                            {tierDescription}
                                        </div>)
                                        :
                                        ""
                                }
                            </div>
                            <div id="modal-footer">
                                <Button classes={{ root: 'create-vm-button' }} onClick={this.createVM} disabled={this.state.vmName === "" || this.state.vmTier === 0}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        );
    }
}

export default Home;