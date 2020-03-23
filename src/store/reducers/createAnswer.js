import { CREATE_ANSWER } from '../types/types'

const answers = [
  { id: 1, text: 'I LOVE the new flavour' },
  { id: 2, text: 'It is too sweet' }
]

const createAnswer = (state = answers, action) => {
  const { answer } = action
  switch (action.type) {
    case CREATE_ANSWER:
      return [...state, answer]
    default:
      return state
  }
}

export default createAnswer
