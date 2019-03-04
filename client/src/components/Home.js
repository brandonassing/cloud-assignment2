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
            vmTier: 1,
            vms: [{
                name: "My VM 1",
                startTime: new Date('October 20, 2018 9:24:00'),

            },
            {
                name: "VM2",
                startTime: new Date('November 12, 2018 19:23:21'),

            },
            {
                name: "Something vm 3",
                startTime: new Date('January 28, 2019 12:00:39'),

            },
            {
                name: "My VM 4",
                startTime: new Date('March 1, 2019 13:24:00'),

            },
            {
                name: "My VM 5",
                startTime: new Date('March 1, 2019 13:24:00'),

            },
            {
                name: "My VM 6",
                startTime: new Date('March 1, 2019 13:24:00'),

            },
            {
                name: "My VM 7",
                startTime: new Date('March 1, 2019 13:24:00'),

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
            vmTier: 1
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
            vmTier: 1
        });
    }

    render() {
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
                                <VM key={item.name} name={item.name} startTime={item.startTime} />
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
                                    Tier {this.state.vmTier}
                                </Button>
                                <Menu
                                    id="tier-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleMenuClose} value={1}>Tier 1</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose} value={2}>Tier 2</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose} value={3}>Tier 3</MenuItem>
                                </Menu>
                            </div>
                            <div id="modal-footer">
                                <Button classes={{ root: 'create-vm-button' }} onClick={this.createVM}>
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