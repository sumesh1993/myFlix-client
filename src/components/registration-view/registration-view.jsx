import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Nav, Navbar, Card, Container, Form, Button, Container, CardGroup } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(register);
    };

    return (

        <Container fluid className="registerContainer" >
    
        <Navbar bg="navColor" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">MyFlix-MovieTime</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#logout">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row>
          <Col>
           <CardGroup>
             <Card classname="registerCard">
              <Card.Body>
                  <Card.Title classname="text-center">Welcome to MyFlix-MovieTime</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">Register Here</Card.Subtitle>

               <Form>
                   <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    </Form.Group>

                    <Button className="registerButton" variant="secondary" size="lg" type="submit"
                         onClick={handleSubmit}>Register
                    </Button>

                    </Form>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
        </Row>
    </Container>

    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};


        
        

       

 