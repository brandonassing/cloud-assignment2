import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class Home extends Component {

    render() {
        return (
            <div>
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
                home
            </div>
        );
    }
}

export default Home;