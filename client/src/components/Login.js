import React, { Component } from 'react';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    handleUsernameChange = e => {
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    }
    handlePasswordChange = e => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    }
    render() {
        return (
            <div id="login-body">
                <div id="login-panel">
                    <h2>Veeeeem</h2>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="filled-username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            margin="normal"
                            variant="filled"
                            type="text"
                            fullWidth={true}
                        />
                        <TextField
                            id="filled-password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            margin="normal"
                            variant="filled"
                            type="password"
                            fullWidth={true}
                        />
                        <Button classes={{ root: 'login-button' }} variant="outlined">
                            Sign in
                        </Button>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;