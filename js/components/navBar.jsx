import React from 'react';
import {connect} from 'react-redux';
import UserName from './UserName'

function NavBar() {
  return (
    <div class="navigation">
      <h1 id="app-name">Code Roulette</h1>
      <h4 id="beta">beta</h4>
  {/*  <div class="userName">
        <UserName userName={userName} />
      </div> */}
      <div>
      <div class="user-input">
        {/* <h3 className="userName">{this.props.userName}</h3> replace the next line "Visitor" with this code */}
        <h3 class="userName">Visitor</h3>
{/* input class='user-name' type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required /> replace the next line with this code */}
        <input class='user-name' type="text" id="userName" required />
{/*       <button type="button" class="name-submit" id="name-submit-bttn" onClick={this.nameSubmit}>Let's go</button> */}
        <button type="button" class="name-submit-bttn" id="name-submit">Let's go</button>
      </div>
      </div>
    </div>
  );
}

//
// userName component:
//
<div className="user-input">
<h3>{this.props.userName}</h3>
  <input className='user-name' type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required />
  <button type="button" className="name-submit" id="name-submit" onClick={this.nameSubmit}>Let's go</button>
</div>





export default NavBar;
