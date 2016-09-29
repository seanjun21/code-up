let initialState = {
  user: {
    userName: '',
    userID: ''
  },
  currentUsers: [],
  questionFeed: {
    tagsOutput: [],
    appliedTags: [],
    filtersOutput: [],
    appliedFilters: []
  },
  currentQuestion: {
    questionID: '',
    questionText: '',
    whenAsked: '',
    messages: []
  }
};
function reducer(state=initialState, action) {
  console.log(action.type, 'action.type');

  switch(action.type) {
    case 'updateQuestionFeed': {
      let currentUsers = state.currentUsers;
      if (action.data.currentUsers) {
        currentUsers = action.data.currentUsers
      }
      return Object.assign({}, state, {
        questionFeed: {
          questions: action.data.questions
          tagsOutput: [],
          appliedTags: [],
          filtersOutput: [],
          appliedFilters: [],
        },
        currentUsers: currentUsers
      })
    }
    case 'updateUser': {
      return Object.assign({}, state, {
        user: action.data.user
      })
    }
    case 'updateRoom': {
      return Object.assign({}, state, {
        currentUsers: action.data.currentUsers
      })
    }
    case 'enterRoom': {
      return Object.assign({}, state, {
        currentQuestion: action.data.currentQuestion,
        currentUsers: action.data.currentUsers
      })
    }
    case 'updateMessages': {
      return Object.assign({}, state, {
        chatMessages: action.data.messages
      })
    }
    case 'addFilterResults': {
      return Object.assign({}, state, {
        filtersOutput: action.data.results
      })
    }
    case 'addTagResults': {
      return Object.assign({}, state, {
        tagsOutput: action.data.results
      })
    }
    case 'applyFilter': {
      let appliedFilters = state.appliedFilters
      appliedFilters.push(action.data.item)
      return Object.assign({}, state, {
        appliedFilters: appliedFilters,
        filtersOutput: []
      })
    }
    case 'applyTag': {
      let appliedTags = state.appliedTags
      appliedTags.push(action.data.item)
      return Object.assign({}, state, {
        appliedTags: appliedTags,
        tagsOutput: []
      })
    }
    case 'removeFilter': {
      let appliedFilters = state.appliedFilters
      for (let i = 0; i < appliedFilters.length; i++) {
        if (action.data.index === i) {
          appliedFilters.splice(i, 1);
        }
      }
      return Object.assign({}, state, {
        appliedTags: appliedTags
      })
    }
    case 'removeTag': {
      let appliedTags = state.appliedTags
      for (let i = 0; i < appliedTags.length; i++) {
        if (action.data.index === i) {
          appliedTags.splice(i, 1);
        }
      }
      return Object.assign({}, state, {
        appliedTags: appliedTags
      })
    }
    default: {
      return state;
    }
  }
}

export default reducer;
