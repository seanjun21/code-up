import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import LandingPage from './components/landing-page';
import ChatroomPage from './components/chatroom-page';

let App = (props) => {
  return (
    <div className='app'>
      <div>
        {props.children}
      </div>
    </div>
  )
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={LandingPage} />
      <Route path="/room/:questionID">
        <IndexRoute component={ChatroomPage} />
      </Route>
    </Router>
);

export default routes;
