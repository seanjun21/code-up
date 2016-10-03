import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import TagsSearchBar from './tags-search-bar'
import tagsArr from '../tags-arr'

class LandingPage extends React.Component {

  constructor() {
    super();
    this.postQuestion = this.postQuestion.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.filtersSearch = this.filtersSearch.bind(this);
    this.tagsSearch = this.tagsSearch.bind(this);
    this.resetFilters = this.resetFilters.bind(this)
    this.resetTags = this.resetTags.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'server/getQuestions'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needRoom) {
      this.props.dispatch({
        type: 'server/setRoom',
        data: {
          questionID: 'lobby'
        }
      })
    }
    if (nextProps.currentQuestion.questionID !== "") {
      hashHistory.push(`/room/${nextProps.currentQuestion.questionID}`);
    }
  }

  postQuestion(event) {
    event.preventDefault();
    if (!this.props.userID) {
      console.log("Please log in to post questions")
    }
    else {
      this.props.dispatch({
        type: "server/postQuestion",
        data: {
          userID: this.props.userID,
          questionText: this.refs.questionText.value,
          tags: this.props.appliedTags
        }
      });
    }
  }

  joinRoom(id) {
    hashHistory.push(`/room/${id}`);
  }

  filtersSearch(event) {
    event.preventDefault();
    let tempArr = [];
    let value = event.target.value.toLowerCase();
    if (value.length > 0) {
      tempArr = tagsArr.filter((item) => {
        item = item.toLowerCase();
        let tagsMatch = new RegExp(value);
        if (item.match(tagsMatch)) {
          return true
        } else {
          return false
        }
      });
    } else {
      tempArr = []
    }
    this.props.dispatch({
      type: "updateQuestionFeed",
      data: {
        filtersOutput: tempArr
      }
    });
  }

  tagsSearch(event) {
    event.preventDefault();
    let tempArr = [];
    let value = event.target.value.toLowerCase();
    if (value.length > 0) {
      tempArr = tagsArr.filter((item) => {
        item = item.toLowerCase();
        let tagsMatch = new RegExp(value);
        if (item.match(tagsMatch)) {
          return true
        } else {
          return false
        }
      });
    } else {
      tempArr = []
    }
    this.props.dispatch({
      type: "updateQuestionFeed",
      data: {
        tagsOutput: tempArr
      }
    });
  }

  resetFilters(event) {
    event.preventDefault();
      this.props.dispatch({
      type: 'server/getQuestions'
    });
  }

  resetTags(event) {
    event.preventDefault();
      this.props.dispatch({
      type: 'updateQuestionFeed',
      data: {
        appliedTags: []
      }
    });
  }

  render() {
    console.log('state', this.props.state);

    let feed = this.props.questions.map((question) => {
      return (
        <li key={question.id}>
          <p>{question.question_text}</p>
          <p>Date: {question.when_asked}</p>
          <div className="room"><p>Room #: {question.id}</p><button type="button" onClick={this.joinRoom.bind(this, question.id)}>Join room</button></div>
        </li>
      )
    });

    let appliedFilters = this.props.appliedFilters.map((filter, index) => {
        return <li key={index + 1}><p>{filter}</p></li>;
    });

    let appliedTags = this.props.appliedTags.map((tag, index) => {
        return <li key={index + 1}><p>{tag}</p></li>;
    });

    let usersOnline = this.props.currentUsers.map((user) => {
        return <li key={user.userID}><p>{user.userName}</p></li>;
    });

    return (
      <div className="landing-page">
        <center className="wrapper">
          <table className="outer" width="100%">
            <tr>
              <td className="content">
                <div className="land-column">
                  <table className="inner" width="100%">
                    <tr>
                      <td className="inner-col">
                        <div className="post-question">
                          <h1>SUBMIT A QUESTION:</h1>
                          <div>
                            <textarea className="post-question-input" name="Text1" cols="36" rows="5" ref="questionText" placeholder="Enter question text" required />
                            <h3>Applied Tags:</h3>
                            <ul>{appliedTags}</ul>
                            <button type="button" onClick={this.resetTags}>Reset Tags</button>
                            <button type="button" onClick={this.postQuestion}>Submit Question</button>
                            <TagsSearchBar text="Add tags to your question" onInput={this.tagsSearch} output={this.props.tagsOutput} what="tag" />
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
                        <div className="question-feed">
                          <h1>ANSWER A QUESTION:</h1>
                          <div>
                            <ul>{feed}</ul>
                          </div>
                          <div className="filters">
                            <h3>Applied Filters:</h3>
                            <ul>{appliedFilters}</ul>
                            <button type="button" onClick={this.resetFilters}>Reset Filters</button>
                            <TagsSearchBar text="Filter questions by tags" onInput={this.filtersSearch} output={this.props.filtersOutput} what="filter" />
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
                          <h1>USERS ONLINE:</h1>
                          <ul>{usersOnline}</ul>
                        </div>
                      </td>
                    </tr>
                  </table>
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
    userName: state.user.userName,
    userID: state.user.userID,
    currentUsers: state.currentUsers,
    questions: state.questionFeed.questions,
    tagsOutput: state.questionFeed.tagsOutput,
    appliedTags: state.questionFeed.appliedTags,
    filtersOutput: state.questionFeed.filtersOutput,
    appliedFilters: state.questionFeed.appliedFilters,
    currentQuestion: state.currentQuestion,
    needRoom: state.needRoom
  }
};

module.exports = connect(mapStateToProps)(LandingPage);
