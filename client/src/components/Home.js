import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import VM from './VM';
import Usage from './Usage';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

// LEGACY REACT FUNC. USED BY UP/DOWNGRADE
import update from 'react-addons-update';
// import { resetWarningCache } from 'prop-types';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createOpen: false,
            anchorEl: null,
            loggedInUser: "",
            vmName: "",
            vmTier: 0,
            charges: "0.00",
            vms: []
        }
    }

    componentDidMount() {
        this.setState({
            loggedInUser: this.props.username
        }, () => {
            this.refresh();
        });
    }

    refresh = () => {
        fetch('/vms?ccId=' + this.state.loggedInUser)
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    vms: resJson
                }, () => {
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
                            charges: (Math.round(charges * 100) / 100).toFixed(2)
                        });
                    }
                });
            });
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
    
    handleLogout = () => {
        fetch('/users/logout', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.loggedInUser
            })
        })
        .then(res => res.json())
        .then(resJson => {
            if (!resJson.error) {
                this.props.loggedIn(false);
            }
        });
    };

    createVM = () => {
        fetch('/vms', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ccId: this.state.loggedInUser,
                name: this.state.vmName,
                tier: this.state.vmTier
            })
        })
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    createOpen: false,
                    vmName: "",
                    vmTier: 0,
                    vms: [...this.state.vms, resJson]
                });
            });
        // TODO error catch
    };

    startStop = (_id, running) => {
        if (running) {
            fetch('/vms/stop/' + _id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resJson => {
                    let indexChange;
                    for (let i = 0; i < this.state.vms.length; i++) {
                        if (this.state.vms[i]._id === resJson._id) {
                            indexChange = i;
                        }
                    }
                    this.setState({
                        vms: update(this.state.vms, { [indexChange]: { usage: { $set: resJson.usage }, running: { $set: resJson.running } } })
                    });
                });
        }
        else {
            fetch('/vms/start/' + _id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resJson => {
                    let indexChange;
                    for (let i = 0; i < this.state.vms.length; i++) {
                        if (this.state.vms[i]._id === resJson._id) {
                            indexChange = i;
                        }
                    }
                    this.setState({
                        vms: update(this.state.vms, { [indexChange]: { usage: { $set: resJson.usage }, running: { $set: resJson.running } } })
                    });
                });

        }
    };

    delete = (_id) => {
        fetch('/vms/' + _id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                let indexRemoved;
                for (let i = 0; i < this.state.vms.length; i++) {
                    if (this.state.vms[i]._id === resJson._id) {
                        indexRemoved = i;
                    }
                }
                this.setState({
                    vms: [...this.state.vms.slice(0, indexRemoved), ...this.state.vms.slice(indexRemoved + 1)]
                });

            });
    };

    upgrade = (_id) => {
        fetch('/vms/upgrade/' + _id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                let indexChange;
                let vmChange;
                for (let i = 0; i < this.state.vms.length; i++) {
                    if (this.state.vms[i]._id === resJson._id) {
                        indexChange = i;
                        vmChange = this.state.vms[i];
                    }
                }
                vmChange.tier++;
                this.setState({
                    vms: update(this.state.vms, { [indexChange]: { tier: { $set: vmChange.tier } } })
                });
            })
    };

    downgrade = (_id) => {
        fetch('/vms/downgrade/' + _id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resJson => {
                let indexChange;
                let vmChange;
                for (let i = 0; i < this.state.vms.length; i++) {
                    if (this.state.vms[i]._id === resJson._id) {
                        indexChange = i;
                        vmChange = this.state.vms[i];
                    }
                }
                vmChange.tier--;
                this.setState({
                    vms: update(this.state.vms, { [indexChange]: { tier: { $set: vmChange.tier } } })
                });
            })

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
                        <h1 id="nav-heading">vee em<span>.</span></h1>
                        <div id="logout-button-wrapper">
                            <button id="refresh-button-main" className="refresh-button" onClick={this.refresh}>refresh</button>
                            <h3 id="username"><span>user: </span>{this.state.loggedInUser}</h3>
                            {/* <Link to="/login" style={{ textDecoration: 'none' }}> */}
                            <Button classes={{ root: 'logout-button' }} variant="outlined" onClick={this.handleLogout}>
                                Logout
                                </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </nav>
                <div id="home-main">
                    <Usage vms={this.state.vms} charges={this.state.charges} isTotal={true} />
                    <Usage vms={this.state.vms} charges={this.state.charges} isTotal={false} />

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
                            this.state.vms.length > 0 ?
                                this.state.vms.map((item) => {
                                    return (
                                        <VM key={item._id} _id={item._id} name={item.name} creationDate={item.creationDate} tier={item.tier} running={item.running} usage={item.usage} startStop={this.startStop} delete={this.delete} upgrade={this.upgrade} downgrade={this.downgrade} />
                                    )
                                })
                                :
                                ""
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