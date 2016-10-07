let initialState = {
  user: {
    userName: '',
    userID: ''
  },
  currentUsers: [],
  questionFeed: {
    questions: [],
    tagsOutput: [],
    appliedTags: [],
    filtersOutput: [],
    appliedFilters: [],
    filteredFeed: false
  },
  currentQuestion: {
    questionID: '',
    questionText: '',
    whenAsked: '',
    messages: [],
    tags: []
  }
};
function reducer(state=initialState, action) {
  switch(action.type) {

    case 'updateQuestionFeed': {
      let questions = state.questionFeed.questions;
      // TODO: fix for resetting peoples filtered questionFeeds (TODO: use join in function to return array of question objects incl. tags and update so you can compare newly posted question to your applied tags)
      if (action.data.questions) {
        if (state.filteredFeed) {
          questions.push(action.data.questions[0]);
        } else {
          questions = action.data.questions;
        }
      }

      let currentQuestion = action.data.currentQuestion || state.currentQuestion;
      let tagsOutput = action.data.tagsOutput || [];
      let appliedTags = action.data.appliedTags || state.questionFeed.appliedTags;
      if (action.data.tag) {
        appliedTags.push(action.data.tag);
      }
      let filtersOutput = action.data.filtersOutput || [];
      let appliedFilters = action.data.appliedFilters || state.questionFeed.appliedFilters;
      if (action.data.filter) {
        appliedFilters.push(action.data.filter);
      }
      let filteredFeed = action.data.filteredFeed || state.questionFeed.filteredFeed;
      let currentUsers = action.data.currentUsers || state.currentUsers;
      return Object.assign({}, state, {
        questionFeed: {
          questions: questions,
          tagsOutput: tagsOutput,
          appliedTags: appliedTags,
          filtersOutput: filtersOutput,
          appliedFilters: appliedFilters,
          filteredFeed: filteredFeed
        },
        currentUsers: currentUsers,
        currentQuestion: currentQuestion
      });
    }
    case 'updateUser': {
      return Object.assign({}, state, {
        user: action.data.user
      });
    }
    case 'updateRoom': {
      return Object.assign({}, state, {
        currentUsers: action.data.currentUsers
      });
    }
    case 'enterRoom': {
      let currentUsers = action.data.currentUsers || state.currentUsers;
      return Object.assign({}, state, {
        currentQuestion: action.data.currentQuestion,
        currentUsers: currentUsers
      });
    }
    case 'updateMessages': {
      return Object.assign({}, state, {
        currentQuestion: {
          questionID: state.currentQuestion.questionID,
          questionText: state.currentQuestion.questionText,
          whenAsked: state.currentQuestion.whenAsked,
          messages: action.data.messages,
          tags: state.currentQuestion.tags
        }
      });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
