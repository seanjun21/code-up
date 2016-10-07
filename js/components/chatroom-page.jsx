import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Firepad from './firepad';
import moment from 'moment';

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
        // let tags = this.props.tags.map((tag) => {
        //     return <li key={tag}><p>{tag}</p></li>;
        // });

        let messages = this.props.messages.map((message, index) => {
            let time = moment(message.when_sent).format('MMM Do YYYY, h:mm A');
            return (
                <li key={index} id={message.question_id}>
                    <h3>{message.message_text}</h3>
                    <p>user: {message.user_name}</p>
                    <p>time: {time}</p>
                </li>
            )
        });

        let usersOnline = this.props.currentUsers.map((user) => {
            return <li key={user.userID}><p>{user.userName}</p></li>;
        });

        let time = moment(this.props.whenAsked).format('MMM Do YYYY, h:mm A');

        let messageForm = 'Please log in to post messages';

        if (this.props.userName !== '') {
            messageForm = (
                <div>
                    <input type="text" className="newMessage" ref="messageText" placeholder="submit message"/>
                    <button type="button" className="newMessageButton" onClick={this.sendMessage}>send</button>
                </div>
            )
        }

        return (
            <div className="chatroom-page">
                <center className="wrapper">
                    <table className="outer" width="100%">
                        <tr>
                            <td className="content">
                                <div className="land-column">
                                    <table className="inner" width="100%">
                                        <tr>
                                            <td className="inner-col">
                                                <div className="question-text">
                                                    <h1>QUESTION:</h1>
                                                    <div>
                                                        <p className="user">USERNAME asked: </p>
                                                        <h3 className="questionText">&nbsp;&nbsp;&nbsp;{this.props.questionText}</h3>
                                                        <p className="date">On: {time}<br/>&nbsp;&nbsp;&nbsp;{this.props.whenAsked}</p>
                                                        <p className="tags">Tags:<br/>&nbsp;&nbsp;&nbsp; </p>
                                                        {/*<ul>*/}
                                                            {/*{tags}*/}
                                                        {/*</ul>*/}
                                                        <button>Answered</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="land-column">
                                    <table className="inner" width="100%">
                                        <tr>
                                            <td className="inner-col">
                                                <div className="post-message">
                                                    <h1>MESSAGE:</h1>
                                                    <div>
                                                        <ul>{messages}</ul>
                                                        {messageForm}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="land-column">
                                    <table className="inner">
                                        <tr>
                                            <td className="inner-col users-online">
                                                <div className="users-online">
                                                    <h1>IN ROOM:</h1>
                                                    <div>
                                                        <ul>{usersOnline}</ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="content">
                                <div className="fire-pad">
                                    <h1>COLLABORATE:</h1>
                                    <Firepad questionID={this.props.params.questionID}/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </center>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        questionID: state.currentQuestion.questionID,
        questionText: state.currentQuestion.questionText,
        whenAsked: state.currentQuestion.whenAsked,
        messages: state.currentQuestion.messages,
        userName: state.user.userName,
        currentUsers: state.currentUsers,
        needRoom: state.needRoom,
        tags: state.currentQuestion.tags
    }
};

module.exports = connect(mapStateToProps)(ChatRoom);
