import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import "./navbar.scss";

export function Navbar({onLoggedOut}) {
    return (
        <div className="main-view">
        <Navbar bg="navColor" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">MyFlix-MovieTime</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Movies</Nav.Link>
              <Nav.Link href="#user">Profile</Nav.Link>
              <Nav.Link href="#logout" onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </div>
    );
}

    
