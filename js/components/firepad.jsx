
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class FirepadEditor extends React.Component {

  componentDidMount() {

     // Initialize the Firebase SDK.
     firebase.initializeApp({
       apiKey: 'AIzaSyDzRGP_qB3NJpsNBokWc584Js4cCaRWObw',
       databaseURL: 'https://code-help-f2a98.firebaseio.com'
     })
     // Get Firebase Database reference.
    var firepadRef = firebase.database().ref(this.props.questionID);

     // Create CodeMirror (with lineWrapping on).
     var codeMirror = CodeMirror(this.refs.firepad, { lineWrapping: true });

     // Create Firepad (with rich text toolbar and shortcuts enabled).
     var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
         { richTextShortcuts: true, richTextToolbar: true, defaultText: "Let's get coding!" });
   }

  render() {
    return (
        <div className="firepad" id="firepad" ref="firepad"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  questionID: state.currentQuestion.questionID
  }
};

export default connect(mapStateToProps)(FirepadEditor);
