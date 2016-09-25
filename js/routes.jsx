import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import LandingPage from './components/landing-page';
import ChatroomPage from './components/chatroom-page';
import NavBar from './components/navBar';

let App = (props) => {
  return (
    <div className='app'>
      <NavBar />
      <div>
        {props.children}
      </div>
    </div>
  )
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="/room/:questionID">
        <IndexRoute component={ChatroomPage} />
      </Route>
    </Route>
  </Router>

);

export default routes;
