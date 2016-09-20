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
          <h2>Log in</h2>
        </div>
        <div>
          <UserName />
        </div>
        <div className="question-feed">
          <p>Log in to submit or answer questions</p>
          <ul>
            <li>question 1</li>
            <li>question 2</li>
            <li>question 3</li>
            <li>question 4</li>
            <li>question 5</li>
          </ul>
        </div>
        {/* <div className="post-question">
          <p>Submit a question:</p>
          <input className="post-question-input"></input>
        </div> */}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {

  }
}
module.exports = connect(mapStateToProps)(LandingPage)
