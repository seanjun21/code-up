import React from 'react';
import {connect} from 'react-redux';

class UserName extends React.Component{

  constructor() {
    super();
    this.nameSubmit = this.nameSubmit.bind(this);
  }

  nameSubmit (event) {
    event.preventDefault();
    let userName = this.name.value;
    this.props.dispatch({
      type: 'server/addUser',
      data: { input: userName }
    });
    console.log(userName, "<---userName");
  }

  render () {

    return (
      <div className="user-input">
      <h3>{this.props.userName}</h3>
        <input className='user-name' type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required />
        <button type="button" className="name-submit" id="name-submit" onClick={this.nameSubmit}>Let's go</button>
      </div>

    )
  }
}

module.exports = connect()(UserName)
