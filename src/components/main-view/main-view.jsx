import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Nav, Navbar, Container } from 'react-bootstrap';

import "./main-view.scss";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {       // Initial state is set to null
      movies: [],
      selectedMovie: null,
      register: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /*When a movie is clicked, this function is invoked and updates the
   state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegistration(register) {
    this.state({
      register,
    });
  }


  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user/ localStorage stores data in a client's 
  browser so they don't have to log in again*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://myflix-movietime.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
    const { movies, selectedMovie, user, register  } = this.state;

    //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);


    /* If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />

    return (

      <div className="main-view">
         <Navbar bg="navColor" variant="dark" expand="lg">
           <Container fluid>
             <Navbar.Brand href="#home">MyFlix-MovieTime</Navbar.Brand>
             <Nav className="me-auto">
               <Nav.Link href="#home">Movies</Nav.Link>
               <Nav.Link href="#user">Profile</Nav.Link>
               <Nav.Link href="/" onClick={() => {this.onLoggedout()}}>Logout</Nav.Link>
             </Nav>
           </Container>
         </Navbar>
         <div>
           <Container>
             {selectedMovie
               ? (
                 <Row className="justify-content-lg-center">
                   <Col lg={9} >
                     <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                   </Col>
                 </Row>
               )
               : (
                 <Row className="justify-content-lg-center">
                   { movies.map(movie => (
                     <Col lg={3} md={4} sm={6} >
                       <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                     </Col>
                     ))
                   }
                 </Row>
               )  
             }
           </Container>
         </div>
          
      </div>
     );

   }

}