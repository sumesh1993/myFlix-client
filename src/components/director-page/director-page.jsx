import React from 'react';
import { LoginView } from '../login-view/login-view';
import { Navbar } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';

export class DirectorPage extends React.Component {
    render() {
        if (!user) return <Col>
        <Navbar/>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        if (movies.length === 0) return <div className="main-view" />;
           return <Col md={8}>
              <DirectorView movie={movies.find(m => m.Director.Name === match.params.directorName)}
                      onBackClick={() => history.goBack()} />
              </Col>
      }
    }