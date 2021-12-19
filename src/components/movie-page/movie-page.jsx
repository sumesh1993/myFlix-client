import React from 'react';
import { LoginView } from '../login-view/login-view';
import { Navbar } from '../navbar/navbar';
import { MovieView } from '../movie-view/movie-view';

export class MoviePage extends React.Component {
    render() {
      const { user, movies } = this.state;
       if (!user) return <Col>
         <Navbar/>
           <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
        if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user}
               setUser={user => this.setUser(user)} onBackClick={() => history.goBack()}
                  />
              </Col>
          }} 
