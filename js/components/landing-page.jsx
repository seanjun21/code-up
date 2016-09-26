/*onClick={this.removeTag(index)}>*/
/*onClick={this.removeFilter(index)}>*/
import React from 'react'
import {connect} from 'react-redux'
import TagsSearchBar from './tags-search-bar'
import tagsArr from '../tags-arr'


class LandingPage extends React.Component {

  constructor() {
    super();
    this.postQuestion = this.postQuestion.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.tagsSearch = this.tagsSearch.bind(this);
    this.filtersSearch = this.filtersSearch.bind(this);
    // this.removeTag = this.removeTag.bind(this)
    // this.removeFilter = this.removeFilter.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'server/getQuestions'
    });
  }

  postQuestion(event) {
    event.preventDefault();
    if (!this.props.userID) {
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
      });
      promise.then((data) => {
        window.location.href = '/#/room/' + data.questionID
      })
    }
  }

  filterQuestions(event) {
    event.preventDefault();
    let filters = this.props.appliedFilters;
    if (filters.length < 1) {
      this.props.dispatch({
      type: "server/getQuestions",
      data: {}
    })
    } else {
      this.props.dispatch({
        type: "server/filterQuestions",
        data: {
          filters: filters
        }
      })
    }
  }

  joinRoom(id, callback) {
    let props = this.props
    return function callback() {
      const promise = new Promise((response) => {
        response(props.dispatch({
          type: "server/joinRoom",
          data: {
            questionID: id
          }
        }))
      });
      promise.then(() => {
        window.location.href = '/#/room/' + id
      })
    }
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
      type: "addFilterResults",
      data: {
        results: tempArr
      }
    })
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
      type: "addTagResults",
      data: {
        results: tempArr
      }
    })
  }

  // removeFilter(idx, callback) {
  //   let props = this.props
  //   return function callback() {
  //     this.props.dispatch({
  //       type: removeFilter,
  //       data: {
  //         index: idx
  //       }
  //     })
  //   }
  // }

  // removeTag(idx, callback) {
  //   let props = this.props
  //   return function callback() {
  //     this.props.dispatch({
  //       type: removeTag,
  //       data: {
  //         index: idx
  //       }
  //     })
  //   }
  // }

  render() {
    if (!this.props.questionFeed) {
      return null
    }
    console.log(this.props.state);
    let feed = this.props.questionFeed.map((question, index) => {
      return (
        <li key={index}>
          <p>{question.question_text}</p>
          <p>Date: {question.whenasked}</p>
          <div className="room"><p>Room #: {question.id}</p><button type="button" onClick={this.joinRoom(question.id)}>Join room</button></div>
        </li>
      )
    });

    let appliedFilters = this.props.appliedFilters;
      appliedFilters = appliedFilters.map((filter, index) => {
        return <li key={index}><p>{filter}</p></li>;
    });

    let appliedTags = this.props.appliedTags;
      appliedTags = appliedTags.map((tag, index) => {
        return <li key={index}><p>{tag}</p></li>;
    });

    let usersOnline = this.props.lobby;
      usersOnline = usersOnline.map((user) => {
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
                            <button type="button" onClick={this.postQuestion}>Submit Question</button>
                            <TagsSearchBar text="Add tags to your question" onInput={this.tagsSearch} output={this.props.tagsOutput} what="Tag" />
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
                            <button type="button" onClick={this.filterQuestions}>Filter Questions</button>
                            <TagsSearchBar text="Filter questions by tags" onInput={this.filtersSearch} output={this.props.filtersOutput} what="Filter" />
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
    questionFeed: state.questionFeed,
    userID: state.userID,
    userName: state.userName,
    filtersOutput: state.filtersOutput,
    tagsOutput: state.tagsOutput,
    appliedTags: state.appliedTags,
    appliedFilters: state.appliedFilters,
    state: state,
    lobby: state.lobby
  }
};

module.exports = connect(mapStateToProps)(LandingPage);