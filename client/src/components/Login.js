import React, { Component } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
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
                    <h2>vee em.</h2>
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
                            InputProps={{
                                
                            }}
                            // InputLabelProps={{
                            //     className: "input-label"
                            // }}
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
                            InputProps={{
                                
                            }}
                            // InputLabelProps={{
                            //     className: "input-label"
                            // }}
                        />
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button 
                            classes={{ root: 'login-button' }} 
                            variant="outlined"
                            disabled={!this.validateForm()}>
                                Sign in
                            </Button>
                        </Link>
                        
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;