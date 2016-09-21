import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import UserName from './UserName'

class LandingPage extends React.Component{
  postQuestion(event) {
    event.preventDefault()
    if (!this.props.userID){
      console.log("Please log in to post questions")
    }
    else {
      const promise = new Promise((response) => {
        response(this.props.dispatch({
          type: "server/postQuestion",
          data: {
            userID: this.props.userID,
            input: this.refs.questionText.value
          }
        }))
      })
      promise.then((data) => {
        window.location.href = '/#/room/' + data.questionID
      })
    }
  }

  filterQuestions(event) {
    event.preventDefault()
    this.props.dispatch({
      type: "server/filterQuestions",
      data: this.refs.filterText.value
    })
  }

  joinRoom(id, callback) {
    return function callback() {
       window.location.href = '/#/room/' + id
    }
  }

  render() {
    if (!this.props.questionFeed) {
      return null
    }
    let feed = this.props.questionFeed.map((question, index) => {
      return (
        <li key={index}>
          <h3>{question.question_text}</h3>
          <h3>Room #: {question.id}</h3>
          <h3>Date: {question.whenasked}</h3>
          <button type="button" className="join-room" onClick={this.joinRoom(question.id)}>Join room</button>
        </li>
      )
    })

    let userName = "Please log in or register"

    if (this.props.userName) {
      userName = this.props.userName
    }

    return (
      <div className="container">
        <div className="appName">
          <h1>Code Roulette</h1>
          <h2>Log in</h2>
        </div>
        <div>
          <UserName userName={userName}/>
        </div>
        <div className="questionFeed">
          <p>Log in to submit or answer questions</p>
          <ul>
          {feed}
          </ul>
          <input className="filter" ref="filterText" type="text" placeholder="filter questions by topic (React, JavaScript, CSS, etc.)"></input>
          <button type="button" className="filter-button">submit filter</button>
        </div>
        <div className="post-question">
          <h1>Submit a question:</h1>
          <input className="post-question-input" ref="questionText" required></input>
          <button type="button" className="question-button" onClick={this.postQuestion}>Submit</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    questionFeed: state.questionFeed,
    userID: state.userID,
    userName: state.userName
  }
}
module.exports = connect(mapStateToProps)(LandingPage)
