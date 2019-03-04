import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import VM from './VM';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createOpen: false,
            anchorEl: null,
            vmName: "",
            vmTier: 0,
            vms: [{
                _id: "1234",
                name: "My VM 1",
                startTime: new Date('October 20, 2018 9:24:00'),
                tier: 1,
                running: true
            },
            {
                _id: "1235",
                name: "VM2",
                startTime: new Date('November 12, 2018 19:23:21'),
                tier: 3,
                running: false
            },
            {
                _id: "1236",
                name: "Something vm 3",
                startTime: new Date('January 28, 2019 12:00:39'),
                tier: 2,
                running: true
            },
            {
                _id: "1237",
                name: "My VM 4",
                startTime: new Date('March 1, 2019 13:24:00'),
                tier: 1,
                running: false
            },
            {
                _id: "1238",
                name: "My VM 5",
                startTime: new Date('March 1, 2019 13:24:00'),
                tier: 1,
                running: true
            },
            {
                _id: "1239",
                name: "My VM 6",
                startTime: new Date('March 1, 2019 13:24:00'),
                tier: 2,
                running: true
            },
            {
                _id: "1240",
                name: "My VM 7",
                startTime: new Date('March 1, 2019 13:24:00'),
                tier: 3,
                running: false
            }]
        }
    }

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

    upgrarde = (id) => {
        console.log('upgrade ' + id);
    };

    downgrade = (id) => {
        console.log('downgrade ' + id);
    };

    render() {
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
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button classes={{ root: 'logout-button' }} variant="outlined">
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div id="home-main">
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
                                <VM key={item._id} _id={item._id} name={item.name} startTime={item.startTime} tier={item.tier} running={item.running} startStop={this.startStop} delete={this.delete} upgrade={this.upgrade} downgrade={this.downgrade} />
                            )
                        })
                    }

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