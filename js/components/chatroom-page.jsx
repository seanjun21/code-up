import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class ChatRoom extends React.Component{

  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(event) {
    event.preventDefault();
    this.props.dispatch({
      type: "server/postMessage",
      data: {
        input: this.refs.messageText.value,
        questionID: this.props.questionID,
        userName: this.props.userName
      }
    })
  }

  render() {
    let messages = this.props.messages.map((message, index) => {
      return (
          <li key={index} id={message.question_id}>
            <h3>{message.message_text}</h3>
            <p>user: {message.user_name}</p>
            <p>time: {message.when_sent}</p>
          </li>
      )
    });

    return (
      <div>
        <h1 className="questionText">{this.props.questionText}</h1>
        <ul>{messages}</ul>
        <input type="text" className="newMessage" ref="messageText" placeholder="submit message" />
        <button type="button" className="newMessageButton" onClick={this.sendMessage}>send message</button>

        <Firepad />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionID: state.currentQuestion.questionID,
    questionText: state.currentQuestion.questionText,
    messages: state.currentQuestion.messages,
    userName: state.user.userName
  }
};

module.exports = connect(mapStateToProps)(ChatRoom);