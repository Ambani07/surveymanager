const initialState = {
  answers: []
}

export const answers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [action.payload, ...state.answers]
      }
    default:
      return state
  }
}
