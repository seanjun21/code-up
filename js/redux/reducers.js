
function reducer(state={}, action) {
  switch(action.type) {
    case 'getQuestionsSuccess': {
      return Object.assign({}, state, {
        questionFeed: action.data.questions
      })
    }
    case 'addUserSuccess': {
      return Object.assign({}, state, {
        userID: action.data.userID,
        userName: action.data.userName
      })
    }
    case 'userEnterLobby': {
      return Object.assign({}, state, {
        lobby: action.data.lobby
      })
    }
    case 'postQuestionSuccess': {
      return Object.assign({}, state, {
        questionFeed: action.data.questions,
        myQuestion: {
          questionText: action.data.questionText,
          questionID: action.data.questionID
        }
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
    default: {
      return state;
    }
  }
}

export default reducer;
