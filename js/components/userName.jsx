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

    let userName = "Please log in or register";

    if (this.props.userName) {
      userName = this.props.userName
    }

    return (
      <div className="user-input">
      <h3>{this.props.userName}</h3>
        <input className='user-name' type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required />
        <button type="button" className="name-submit" id="name-submit" onClick={this.nameSubmit}>Register</button>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  userName: state.userName
  }
};

module.exports = connect(mapStateToProps)(UserName)
