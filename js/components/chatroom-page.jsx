import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Firepad from './firepad';

class ChatRoom extends React.Component {

    constructor() {
        super();
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        let questionID = this.props.params.questionID;
        this.props.dispatch({
            type: 'server/loadRoom',
            data: {
                questionID: questionID
            }
        });
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

        let usersOnline = this.props.currentUsers.map((user) => {
            return <li key={user.userID}><p>{user.userName}</p></li>;
        });

        return (
            <div className="chatroom-container">
                <div className="chat-users">
                    <p>Current users: </p>
                    <ul>
                        {usersOnline}
                    </ul>
                </div>
                <div className="message-container">
                    <h1 className="questionText">{this.props.questionText}</h1>
                    <ul>message: this is a text placeholder {messages}</ul>
                    <input type="text" className="newMessage" ref="messageText" placeholder="submit message"/>
                    <button type="button" className="newMessageButton" onClick={this.sendMessage}>send</button>
                </div>
                <Firepad questionID={this.props.params.questionID}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        questionID: state.currentQuestion.questionID,
        questionText: state.currentQuestion.questionText,
        messages: state.currentQuestion.messages,
        userName: state.user.userName,
        currentUsers: state.currentUsers,
        needRoom: state.needRoom
    }
};

module.exports = connect(mapStateToProps)(ChatRoom);
