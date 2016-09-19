import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import LandingPage from './components/landing-page';
import ChatroomPage from './components/chatroom-page';

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={LandingPage}/>
        <Route path="/chatroom" component={ChatroomPage}/>
    </Router>
);

export default routes;
