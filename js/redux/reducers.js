
function reducer(state={}, action) {
  switch(action.type) {
    case actions.getQuestionsSuccess: {
      return action.initialQuestions
    }
    case actions.addUserSuccess: {
      return action.user
    }
    case actions.postQuestionSuccess: {
      return action.user
    }
    case actions.postMessageSuccess: {
      return action.message
    }
    case actions.questionFilterSuccess: {
      return action.questions
    }
    default: {
      return state;
    }
  }
}

export default reducer;
