import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';

export class HomePage extends React.Component {
    render() {
        if (!user) return <Col>
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