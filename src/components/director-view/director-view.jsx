import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap';

export function DirectorView({movie, onBackClick }) {
    return(
        <div className='director-view'>
            <h1>{movie.Director.Name}</h1>
            <h3>{movie.Director.Bio}</h3>
            <Button className='mt-5' variant='dark' size='md' onClick={() => onBackClick()}>Back</Button>
        </div>
    )
}

DirectorView.propTypes = {
    movie: PropTypes.shape({
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}