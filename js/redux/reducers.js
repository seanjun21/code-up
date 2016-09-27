
function reducer(state={}, action) {
  switch(action.type) {
    case 'getQuestionsSuccess': {
      return Object.assign({}, state, {
        questionFeed: action.data.questions,
        tagsOutput: [],
        filtersOutput: [],
        appliedTags: [],
        appliedFilters: [],
        curRoomOccupants: action.data.curRoomOccupants,
        currentQuestion: {
          questionID: '',
          questionText: '',
          messages: []
        }
      })
    }
    case 'addUserSuccess': {
      return Object.assign({}, state, {
        userID: action.data.userID,
        userName: action.data.userName
      })
    }
    case 'updateLobby': {
      return Object.assign({}, state, {
        curRoomOccupants: action.data.curRoomOccupants
      })
    }
    case 'updateQuestionFeed': {
      return Object.assign({}, state, {
        questionFeed: action.data.questions,
        curRoomOccupants: action.data.curRoomOccupants,
        appliedTags: [],
        tagsOutput: []
      })
    }
    case 'postQuestionSuccess': {
      console.log(action.data, '<--- action.data');
      return Object.assign({}, state, {
        currentQuestion: {
          questionText: action.data.questionText,
          questionID: action.data.questionID,
          whenAsked: action.data.whenAsked,
        },
        curRoomOccupants: action.data.curRoomOccupants
      })
    }
    case 'postMessageSuccess': {
      return Object.assign({}, state, {
        chatMessages: action.data.messages
      })
    }
    case 'questionFilterSuccess': {
      return Object.assign({}, state, {
        questionFeed: action.data.questions
      })
    }
    case 'joinRoomSuccess': {
      return Object.assign({}, state, {
        currentQuestion: {
          questionText: action.data.questionText,
          questionID: action.data.questionID,
          messages: action.data.messages,
        },
        curRoomOccupants: action.data.curRoomOccupants
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
