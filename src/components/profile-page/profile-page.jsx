import React from 'react';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { Col } from 'react-bootstrap';

export class ProfilePage extends React.Component {
    render() {
      const { user, movies } = this.state;
        if (!user) return <Col>
        <Navbar/>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
       </Col>

        if (movies.length === 0) return <div className="main-view" />;
        return <Col md={12}>
        <ProfileView user={user} setUser={user => this.setUser(user)}
        movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}/>
     </Col>
  }
}