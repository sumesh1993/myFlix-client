import React from "react";
import { Navbar } from "../navbar/navbar";
import { Redirect } from 'react-router-dom';
import { RegistrationView } from "../registration-view/registration-view";

export class RegistrationPage extends React.Component {
    render() {
        if (user) return <Redirect to="/" />
           return <Col>
           <Navbar/>
             <RegistrationView />
              </Col>
         }
     } 
