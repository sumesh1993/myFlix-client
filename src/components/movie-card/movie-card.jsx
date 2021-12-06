import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
          <Card>
            <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous"/>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Button onClick={()=> onMovieClick(movie)} variant="link">Open</Button>
            </Card.Body>
          </Card>
        );
    }
  }

  MovieCard.propTypes = {
    movie: PropTypes.shape ({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Stars: PropTypes.array.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
        


      
    