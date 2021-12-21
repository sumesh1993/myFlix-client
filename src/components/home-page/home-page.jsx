import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { Col } from 'react-bootstrap';

export class HomePage extends React.Component {

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
      setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
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

    render() {
        const { user, movies } = this.props;

        if (!user) 
        return <Col>
        <Navbar/>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
        </Col>

        if (movies.length === 0) return (<div className="main-view"/>);

        return movies.map(m => (
            <Col sm={6} md={4} lg={3} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))      
    }
}