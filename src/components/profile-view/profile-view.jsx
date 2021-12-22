import React, {useState} from 'react';
import {Col, Row, Card, Form, Button, Container, CardGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import './profile-view.scss';

export function ProfileView({ user, setUser, onLoggedOut }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState=('');
    const [birthday, setBirthday] = useState('');

    const token = localStorage.getItem('token');
    const handleSubmit = (e) => {
        e.preventDefault();

    axios.put(`https://myflix-movietime.herokuapp.com/users/${user.Username}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }, {
        headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
        console.log(response.data);
        setUser(response.data);
        window.open('/', '_self');
    })
    .catch(e => {
        console.log('error registering user')
    });

    const handleDelete = () => {
        axios.delete(`https://myflix-movietime.herokuapp.com/${user.Username}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            console.log(response.data);
            onLoggedOut()
        })
        .catch(err => {
            console.error(err)
        });
    }
    const favoriteMovies = props.movies.map(movie => user.FavoriteMovies.includes(movie._id));

    return (

        <Container fluid className="profileContainer" >
        <Row>
          <Col>
           <CardGroup>
             <Card classname="profileCard">
              <Card.Body>
                  <Card.Title className="text-center">Profile</Card.Title>

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

                    <Button className="updateButton" variant="secondary" size="lg" type="submit"onClick={handleSubmit}>Update
                    </Button>

                    <Button className="deleteButton" variant="secondary" size="lg" type="submit"onClick={handleDelete}>Delete Profile
                    </Button>

                    </Form>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
        </Row>
    </Container>

    )
}
ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.date,
    }).isRequired,
    setUser: PropTypes.func.isRequired,
  }
}
