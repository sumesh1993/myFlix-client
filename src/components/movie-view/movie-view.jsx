import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss'

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (

          <Container fluid className="movieContainer">
             <Row>
               <Col>
                <div className="movie-view">
                  <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="anonymous" />
                </div>
                <div className="movie-title">
                    <span className="title">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="description">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="genre">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="director">Director:  </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-stars">
                    <span className="stars">Stars: </span>
                    <span className="value">{movie.Stars}</span>
                </div>
                <div className="director-btn-div">
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button className="director-btn" bg="dark" variant="secondary">Director</Button>
                  </Link>
                </div>
                <div className="genre-btn-div">
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button className="genre-btn" bg="dark" variant="secondary">Genre</Button>
                  </Link>
                </div>
                <div className="movie-btn-div">
                <Button className="movie-btn" bg="dark" varinat="dark" onClick={() => { onBackClick(null);}}>Back</Button>
                </div>

            </div>
          </Col>
        </Row>
     </Container>
            
    );
  }
}

MovieView.propTypes = {
    movie: PropTypes.shape ({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Stars: PropTypes.array.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };