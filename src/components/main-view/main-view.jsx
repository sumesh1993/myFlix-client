import React from 'react';

 export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Goodfellas', Description: ' movie description1', ImagePath: 'https://www.imdb.com/title/tt0099685/mediaviewer/rm2091797760/'},
                {_id: 2, Title: 'Titanic', Description: 'movie description2', ImagePath: 'https://www.imdb.com/title/tt0120338/mediaviewer/rm2647458304/'},
                {_id: 3, Title: 'Pulp Fiction', Description: 'movie description3', ImagePath: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/'}
            ]
        }
    }
    render () {
        const movies = this.state.movies;
        if (movies.length === 0) {
            return <div className="main-view">The list is empty</div>;
        } else {
            return (
                <div className="main-view">
                    {movies.map((movie) => {
                        return <div>{movie.Title}</div>;
                    })}
                </div>
            );
        }
    }
