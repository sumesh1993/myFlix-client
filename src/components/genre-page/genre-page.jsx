import React from "react";
import { LoginView } from "../login-view/login-view";
import { Navbar } from "../navbar/navbar";
import { GenreView } from "../genre-view/genre-view";

export class GenrePage extends React.Component {
    render() {
        if (!user) return <Col>
        <Navbar/>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
             </Col>
        if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <GenreView movie={movies.find(m => m.Genre.Name === match.params.genreName)} onBackClick={() => history.goBack()} />
              </Col>
    }
}