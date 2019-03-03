import React, { Component } from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import VM from './VM';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        <h2 id="plus-symbol">
                            +
                        </h2>
                        <h2 id="create-text">
                            Create new VM
                        </h2>
                    </div>
                    {
                        this.state.vms.map((item) => {
                            return(
                                <VM key={item.name} name={item.name} startTime={item.startTime} />
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default Home;