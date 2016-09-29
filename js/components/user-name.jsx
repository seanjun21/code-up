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
  }

  render () {

    let userName = "Please log in or register";

    if (this.props.userName) {
      userName = `Welcome ${this.props.userName}!`
    }

    return (
      <div className="user-name">
        <div className="add-user"><input className='user-input' type="text" ref={(name) => { this.name = name; }} placeholder={this.props.userName} id="userName" required /><button type="button" id="name-submit" onClick={this.nameSubmit}>Submit</button></div>
        <h3>{userName}</h3>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  userName: state.user.userName
  }
};

module.exports = connect(mapStateToProps)(UserName)
