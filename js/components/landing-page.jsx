/*onClick={this.removeTag(index)}>*/
/*onClick={this.removeFilter(index)}>*/
import React from 'react'
import {connect} from 'react-redux'
import TagsSearchBar from './tags-search-bar'
import tagsArr from '../tags-arr'


class LandingPage extends React.Component {

  constructor() {
    super()
    this.postQuestion = this.postQuestion.bind(this)
    this.filterQuestions = this.filterQuestions.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.tagsSearch = this.tagsSearch.bind(this)
    this.filtersSearch = this.filtersSearch.bind(this)
    // this.removeTag = this.removeTag.bind(this)
    // this.removeFilter = this.removeFilter.bind(this)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'server/getQuestions'
    });
  }

  postQuestion(event) {
    event.preventDefault()
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
    let filters = this.props.appliedFilters
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
        response(this.props.dispatch({
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
    event.preventDefault()
    let tempArr = []
    let value = event.target.value.toLowerCase()
    if (value.length > 0) {
      tempArr = tagsArr.filter((item) => {
        item = item.toLowerCase()
        let tagsMatch = new RegExp(value)
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
    event.preventDefault()
    let tempArr = []
    let value = event.target.value.toLowerCase()
    if (value.length > 0) {
      tempArr = tagsArr.filter((item) => {
        item = item.toLowerCase()
        let tagsMatch = new RegExp(value)
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
    console.log(this.props.state)
    let feed = this.props.questionFeed.map((question, index) => {
      return (
        <li key={index}>
          <h3>{question.question_text}</h3>
          <h3>Room #: {question.id}</h3>
          <h3>Date: {question.whenasked}</h3>
          <button type="button" className="join-room" onClick={this.joinRoom(question.id)}>Join room</button>
        </li>
      )
    });

    let appliedFilters = this.props.appliedFilters
      appliedFilters = appliedFilters.map((filter, index) => {
        return <li key={index}><p>{filter}</p></li>;
    });

    let appliedTags = this.props.appliedTags
      appliedTags = appliedTags.map((tag, index) => {
        return <li key={index}><p>{tag}</p></li>;
    });

    return (
      <div className="container">
        <div className="questionFeed">
          <p>Log in to submit or answer questions</p>
          <ul>
          {feed}
          </ul>
          <TagsSearchBar text="Filter questions by tags" onInput={this.filtersSearch} output={this.props.filtersOutput} what='Filter' />
          <p>Current Tags:</p>
          <ul>{appliedFilters}</ul>
          <button type="button" className="filter-button" onClick={this.filterQuestions}>Apply Filter(s)</button>
        </div>
        <div className="post-question">
          <h1>Submit a question:</h1>
          <input className="post-question-input" ref="questionText" placeholder='Enter question text' required />
          <p>Current Tags:</p>
          <ul>{appliedTags}</ul>
          <TagsSearchBar text="Add tags to your questions" onInput={this.tagsSearch} output={this.props.tagsOutput} what='Tag' />
          <button type="button" className="question-button" onClick={this.postQuestion}>Submit</button>
        </div>
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
    state: state
  }
};

module.exports = connect(mapStateToProps)(LandingPage);