import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Nav, Navbar, Card, Container, Form, Button, Container, CardGroup } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflix-movietime.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };

    return (

        <Container fluid className="registerContainer" >
    
        <Navbar 
          bg="navColor" 
          variant="dark" 
          expand="lg">
        </Navbar>

        <Row>
          <Col>
           <CardGroup>
             <Card classname="registerCard">
              <Card.Body>
                  <Card.Title className="text-center">Welcome to MyFlix-MovieTime</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">Register Here</Card.Subtitle>

               <Form>
                   <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control 
                          type="date" 
                          value={birthday} 
                          onChange={e => setBirthday(e.target.value)}/>
                    </Form.Group>

                    <Button 
                      className="registerButton" 
                      variant="secondary" 
                      size="lg" 
                      type="submit"
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