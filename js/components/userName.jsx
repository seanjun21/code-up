import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../redux/actions';

class UserName extends React.Component{

  nameSubmit (event) {
    event.preventDeafult();
    let userName = this.refs.userName.value;
    this.props.dispatch(actions.submitName(userName));
    console.log(userName, "<---userName")
  }

  render () {
    return (
      <div className="user-input">
        <input className='user-name' type="text" ref="userName" placeholder={this.props.userName} id="userName" required />
        <button type="button" className="name-submit" id="name-submit" onClick={this.nameSubmit}>Let's go</button>
      </div>

    )
  }
}

var Container = connect(mapStateToProps)(UserName);
module.exports = Container;
