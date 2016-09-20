import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class ChatRoom extends React.Component{
  render() {
    return (
      <div>
        <ul></ul>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  return {

  }
}
module.exports = connect(mapStateToProps)(ChatRoom)
