import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import UserName from './UserName'
// import actions from '..redux/actions';

class LandingPage extends React.Component{
  render() {
    return (
      <div className="container">
        <div className="app-name">
          <h1>Code Roulette</h1>
          <h2>Sign in to continue</h2>
        </div>
        <div>
          <UserName />
        </div>
      </div>
    );
  }
};
