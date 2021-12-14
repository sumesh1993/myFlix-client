import React from 'react';

import {Navbar, Container, Nav} from 'react-bootstrap';


import './navbar-view.scss';

export class Navbar extends React.Component {
    constructor() {
        super();
        this.state={};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }};

    return (
        <Container fluid>
           <Navbar bg="navColor" variant="dark" expand="lg">
              <Navbar.Brand href="#home">MyFlix-MovieTime</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navbar-menu">
                      <Nav.Link href="/">Movies</Nav.Link>
                      <Nav.Link href="/users/:username">Profile</Nav.Link>
                      <Nav.Link href="/" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
              </Navbar>
            </Container>
    );
    
