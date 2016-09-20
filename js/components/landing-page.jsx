import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import UserName from './UserName'
// import actions from '..redux/actions';

class LandingPage extends React.Component{
  // Write a function to dispatch postQuestion
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
        <div className="question-feed">
          <ul>
          </ul>
        </div>
        <div className="post-question">
          <input className="post-question-input"></input>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {

  }
}
module.exports = connect(mapStateToProps)(LandingPage)
