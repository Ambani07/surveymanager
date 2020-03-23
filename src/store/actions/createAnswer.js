import { CREATE_ANSWER } from '../types/types'
import uuid from 'react-uuid'

export const createAnswerAction = answer => {
  return {
    type: CREATE_ANSWER,
    answer
  }
}
