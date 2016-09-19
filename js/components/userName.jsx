import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '..redux/actions';

class UserName extends React.Component{

  nameSubmit: function (event) {
    event.preventDeafult();
    let userName = this.refs.userName.value;
    this.props.dispatch(actions.submitName(userName));
    console.log(userName, "<---userName")
  }

  render: function() {
    return {
      <div className="user-input">
        <input className='user-name' type="text" ref="userName" placeholder="User Name" id="userName" required />
        <button type="button" className="name-submit" id="name=submit" onClick={this.nameSubmit}>submit</button>
      </div>

    }
  }
}

var Container = connect(mapStateToProps)(UserName);
module.exports = Container;
