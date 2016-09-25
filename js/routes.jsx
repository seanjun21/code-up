import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import LandingPage from './components/landing-page';
import ChatroomPage from './components/chatroom-page';
import NavBar from './components/navBar';

let App = (props) => {
  return (
    <div className='app'>
      {/* <div> */}
        <div className="container">
          <div className="navigation">
            <h1 id="app-name">Code Roulette</h1>
            <h4 id="beta">beta</h4>
              <div className="userName">
              <UserName userName={userName} />
              </div>
          </div>
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
