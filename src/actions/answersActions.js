import { ADD_ANSWER } from './types'

export const addAnswer = answer => {
  return {
    type: ADD_ANSWER,
    answer
  }
}
