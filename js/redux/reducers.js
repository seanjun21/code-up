

// Initial state for userName when the page loads
function reducer(state={}, action) {
  switch(action.type) {
    case actions.ON_LOAD: {
      return action.userName("Please login")
    }
    case actions.SUBMIT_NAME: {
      return action.userName
    }
    default: {
      return state;
    }
  }
}

export default reducer;
