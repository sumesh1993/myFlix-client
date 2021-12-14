import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Navbar, Form, Button, Card, Container} from 'react-bootstrap';

import "./login-view.scss";


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://myflix-movietime.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (

    <Container fluid className="loginContainer" >

      <Navbar 
        bg="navColor" 
        variant="dark" 
        expand="lg">
      </Navbar>

      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center">Welcome to MyFlix-MovieTime</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Login Here</Card.Subtitle>

          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                className="mb-3"
                type="password"
                onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button
               className="loginButton"
               variant="secondary"
               size="lg"
               type="submit"
               onClick={handleSubmit}>
                 Login
               </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>

  );
}
      
LoginView.propTypes = {
  user:PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}),
onLoggedIn: PropTypes.func.isRequired
};