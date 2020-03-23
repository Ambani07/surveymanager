import { ADD_PRODUCT_ANSWER } from './types'

export const addProductAnswer = answer => {
  return {
    type: ADD_PRODUCT_ANSWER,
    answer
  }
}
