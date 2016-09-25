import React from 'react';
import {connect} from 'react-redux';
import UserName from './user-name';

function NavBar () {

  return (
    <div className="navigation">
      <h1 id="app-name">Code Roulette</h1>
      <h4 id="beta">beta</h4>
      <div className="userName">
        <UserName />
      </div>

      {/* <div className="user-input">
        <h3 className="userName">{this.props.userName}</h3>
        <input className="nameInput" type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required />
        <button type="button" className="name-submit-bttn" id="name-submit-bttn" onClick={this.nameSubmit}>Let's go</button>
      </div> */}

    </div>
  );
}

export default NavBar;
