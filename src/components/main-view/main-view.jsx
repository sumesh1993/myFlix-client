import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Nav, Navbar, Container } from 'react-bootstrap';

import "./main-view.scss";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView} from '../director-view/director-view';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {       // Initial state is set to null
      movies: [],
      //selectedMovie: null,
      //register: null,
      user: null
    };
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

  /*setSelectedMovie(movie) {
    //this.setState({
      //selectedMovie: movie
    });
  }*/

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

 /*onLoggedIn(user) {
    this.setState({
      user
    });
  }*/

  render() {
    const { movies, user} = this.state; //may need to add register

    //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);


    /* If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    //if (!user) return <Row>
      //<Col>
         //<LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      //</Col>
    //</Row>
    //if (movies.length === 0) return <div className="main-view"/>

    return (

      <Router>

        <Container fluid>
           <Navbar bg="navColor" variant="dark" expand="lg">
              <Navbar.Brand href="#home">MyFlix-MovieTime</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Movies</Nav.Link>
                      <Nav.Link href="/users/:username">Profile</Nav.Link>
                      <Nav.Link href="/" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
              </Navbar>
            </Container>


        <div>
          <Container>
            <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {

            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            </Col>

            //Before the movies have been loaded
            if (movies.length === 0) return (<div className="main-view"/>);
            return movies.map(m => (
              <Col sm={6} md={4} lg={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }}/>

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/"/>
            return <Col>
               <RegistrationView/>
            </Col>
          }}/>

          <Route path="/users/:username" render={({history}) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            if (movies.length === 0) return <div className="main-view"></div>;
            return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
          }}/>

          <Route path="/movies:movieId" render={({match, history}) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            </Col>

            if (movies.length === 0) return (<div className="main-view"/>);
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
            </Col>
          }}/>

          <Route path="/genres/:name" render={({match, history}) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            </Col>

            if(movies.length === 0) return <div className="main-view"/>;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }
        }/>

        <Route path="/directors/:name" render={({match, history}) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
          </Col>

          if (movies.length === 0) return <div className="main-view"/>;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
          </Col>
        }
      }/>

        </Row>
      </Container>
    </div>
  </Router>
    );
  }
}


            