import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./main-view.scss";

import { HomeView } from '../home-view/home-view';
import { RegistrationView } from  '../registration-view/registration-view';
import { MoviePage } from '../movie-page/movie-page';
import { ProfilePage } from '../profile-page/profile-page';
import { GenrePage } from '../genre-page/genre-page';
import { DirectorPage } from '../director-page/director-page';

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

   <div>
     <Routes>
          <Route exact path="/" render={HomeView} />

          <Route exact path="/" render={ProfilePage} />

          <Route exact path="/" render={MoviePage} />

          <Route exact path="/" render={DirectorPage} />

          <Route exact path="/" render={GenrePage} />

          <Route path='/register' render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                  <RegistrationView />
              </Col>
          }} />
    </Routes>
  /</div>
  
    );
   }
 }

