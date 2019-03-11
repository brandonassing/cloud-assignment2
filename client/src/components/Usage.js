import React, { Component } from 'react';
import './Usage.css';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import moment from 'moment';

class Usage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: "",
            endTime: "",
            anchorEl: null,
            vm: "",
            vmCharges: 0
        }
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    handleStartTimeChange = (e) => {
        this.setState({
            startTime: e.target.value
        });
    }

    handleEndTimeChange = (e) => {
        this.setState({
            endTime: e.target.value
        });
    }

    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = (e) => {
        this.setState({
            anchorEl: null,
            vm: !!e.target.getAttribute('value') ? e.target.getAttribute('value') : this.state.vm
        }, () => {
            if (this.state.vm !== "") {
                let start = moment(new Date(this.state.startTime));
                let end = moment(new Date(this.state.endTime));
                let minSum = 0;
                
                let vm = this.props.vms.find((item) => {
                    return item.name = this.state.vm;
                });
    
                vm.usage.forEach(usage => {
                    let usageEnd = usage.endTime === null ? moment(Date.now()) : moment(usage.endTime);
                    let usageStart = moment(usage.startTime);
                    if (usageStart.isBefore(start)) {
                        if (usageEnd.isBefore(start)) {
                            if (usageEnd.isBefore(end)) {
                                // start out : end in
                                minSum += moment.duration(moment(start).diff(moment(usageEnd))).asMinutes();
                            }
                            else {
                                // start out : end out
                                minSum += moment.duration(moment(start).diff(moment(end))).asMinutes();
                            }
                        }
                    }
                    else if (usageStart.isBefore(end)) {
                        if (usageEnd.isBefore(end)) {
                            // start in : end in
                            minSum += moment.duration(moment(usageStart).diff(moment(usageEnd))).asMinutes();
                        }
                        else {
                            // start in : end out
                            minSum += moment.duration(moment(usageStart).diff(moment(end))).asMinutes();
                        }
                    }
                });
                let vmCharges = minSum * (vm.tier === 1 ? 0.05 : (vm.tier === 2 ? 0.1 : 0.15));
                this.setState({
                    vmCharges: (Math.round(vmCharges * 100) / 100).toFixed(2)
                });
            }
        });
    };

    render() {
        const { vms, charges } = this.props;
        return (
            <div id="usage-body">
                {
                    this.props.isTotal ?
                        <h2>Total charges: <span>$ {charges}</span></h2>
                        :
                        (
                            <div id="usage-selection">
                                <div id="usage-time-fields">
                                    <div>
                                        <TextField
                                            id="vm-start-time"
                                            label="Start time"
                                            value={this.state.startTime}
                                            onChange={this.handleStartTimeChange}
                                            margin="normal"
                                            variant="filled"
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="vm-end-time"
                                            label="End time"
                                            value={this.state.endTime}
                                            onChange={this.handleEndTimeChange}
                                            margin="normal"
                                            variant="filled"
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </div>

                                </div>
                                <div id="usage-vm-fields">
                                    <div id="vm-dropdown">
                                        <Button
                                            aria-owns={this.state.anchorEl ? 'vm-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleMenuClick}
                                            classes={{ root: 'vm-button' }}
                                            disabled={this.state.startTime === "" || this.state.endTime === ""}
                                        >
                                            Select VM
                                        </Button>
                                        <Menu
                                            id="vm-menu"
                                            anchorEl={this.state.anchorEl}
                                            open={Boolean(this.state.anchorEl)}
                                            onClose={this.handleMenuClose}
                                        >
                                            {
                                                vms.map(vm => {
                                                    return (
                                                        <div key={vm._id + "-usage"}>
                                                            <MenuItem onClick={this.handleMenuClose} value={vm.name}>{vm.name}</MenuItem>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Menu>
                                    </div>
                                    <div hidden={this.state.vm === ""}>
                                        <h3><span id="vm-name">{this.state.vm}</span> charges: <span id="vm-charge">$ {this.state.vmCharges}</span></h3>
                                    </div>
                                </div>

                            </div>

                        )
                }

            </div>
        );
    }
}

export default Usage;
