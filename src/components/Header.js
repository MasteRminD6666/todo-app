import React from 'react';
import '../components/scss/Header.css';
import { Navbar, Button, Alignment } from '@blueprintjs/core';

// <h1></h1>

function Header(props) {
    return (
        <>

            <header>
                <div id="container">



                    <h1 >
                        To Do List: {props.incomplete} items pending
                    </h1>

                </div>

            </header>
            <Navbar className="bp3-navbar bp3-dark">
                <Navbar.Group>
                    <Navbar.Heading>To Do List: {props.incomplete} items pending</Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home" text="Tasks" />
                </Navbar.Group>
            </Navbar>
        </>
    );
}

export default Header;