
//
// <div id="firepad" ref="firepad"> goes in the chatroom-page component
//
// on componentDidMount() {
//  this.refs.firepad
// }
//

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

// componentDidMount() {
//   this.refs.Firepad()
// }

function Firepad () {
  return (
    <div className="firepad" id="firepad" ref="firepad"></div>
  );
}



export default Firepad;
