/* eslint-disable no-console */
import { ADD_ANSWER, GET_ANSWER } from './types'

import { firestore } from 'react-redux-firebase'

export const addAnswer = answer => {
  return {
    type: ADD_ANSWER,
    answer
  }
}

// function addAnswer(answer, productId) {
//   return {
//     type: ADD_ANSWER,
//     answer,
//     id: productId
//   }
// }

// export function addProductPossibleAnswers(newAnswer, productId) {
//   return (dispatch, getFirebase) => {
//     return getFirebase
//       .update({ collection: 'products', doc: productId }, newAnswer)
//       .the(() => {
//         dispatch(addAnswer(newAnswer, productId))
//       })
//       .then(() => {
//         console.log('Todo Added')
//       })
//   }
// }
