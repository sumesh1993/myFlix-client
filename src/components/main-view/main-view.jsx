import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

 export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Goodfellas', Description: ' The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMD…YjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'},
                {_id: 2, Title: 'Titanic', Description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3ND…ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'},
                {_id: 3, Title: 'Pulp Fiction', Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption', ImagePath: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZT…MjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'}
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          
            selectedMovie: newSelectedMovie
    });
   }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return 
         <div className="main-view">The list is empty</div>;

         return (
            <div className="main-view">
              {selectedMovie
                ? <MovieView movie = {selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                : movies.map(movie => (
                  <MovieCard key = {movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                  ))
              }
            </div>
          );
        }
      }