import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import "./main-view.scss";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavBarView } from '../navbar-view/navbar-view';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {      
      movies: [],
       selectedMovie: null,
       register: null,
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
    window.open("/", "_self");
  }

  render() {
    const { movies, user} = this.state; //may need to add register

    //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>)

    return (

     <Router>
      <Route path='/' render={() => {
          if (user) return <Row>
              <Col md={12}>
                  <NavBarView onLoggedOut={() => this.onLoggedOut()} />
              </Col>
          </Row>
      }} />
      <Row className="justify-content-md-center p-2">

          {/* login page */}
          <Route exact path='/' render={() => {
              if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MovieCard movies={movies} />
          }} />

          {/* register page */}
          <Route path='/register' render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                  <RegistrationView />
              </Col>
          }} />

          {/* profile page */}
          <Route path='/profile' render={({ history }) => {
              if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={12}>
                  <ProfileView user={user} setUser={user => this.setUser(user)}
                      movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
                  />
              </Col>
          }} />

          {/* movie page */}
          <Route path='/movies/:movieId' render={({ match, history }) => {
              if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user}
                      setUser={user => this.setUser(user)} onBackClick={() => history.goBack()}
                  />
              </Col>
          }} />

          {/* director page */}
          <Route path='/directors/:directorName' render={({ match, history }) => {
              if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                  <DirectorView movie={movies.find(m => m.Director.Name === match.params.directorName)}
                      onBackClick={() => history.goBack()}
                  />
              </Col>
          }} />

          {/* genre page */}
          <Route path='/genres/:genreName' render={({ match, history }) => {
              if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                  <GenreView movie={movies.find(m => m.Genre.Name === match.params.genreName)} onBackClick={() => history.goBack()} />
              </Col>
          }} />

      </Row>
  </Router>
  
    );
   }
 }
