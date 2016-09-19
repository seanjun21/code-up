import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '..redux/actions';

class LandingPage extends React.Component{
  render: function() {
    return {
      <div className="container">
        <div className="app-name">
          <h1>Code Roulette</h1>
        </div>
        <div>
          <UserName />
        </div>
      </div>
    };
  }
};
