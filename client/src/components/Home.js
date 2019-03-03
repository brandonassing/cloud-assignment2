import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import VM from './VM';


class Home extends Component {

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
                    <div id="vm-create" className="vm-body">
                        <h2>
                            +
                        </h2>
                        <h2>
                            Create new VM
                        </h2>
                    </div>
                    <VM />
                    <VM />
                    <VM />
                    <VM />
                    <VM />
                    <VM />
                    <VM />

                </div>
            </div>
        );
    }
}

export default Home;