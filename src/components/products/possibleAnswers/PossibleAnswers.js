/* eslint-disable no-console */
//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//React Redux Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

//Helpers
import update from 'immutability-helper'
import produce from 'immer'

//Components
import Spinner from '../../layout/Spinner'
import Answer from './Answer'

//Actions
import * as actions from '../../../actions'

class PossibleAnswers extends Component {
  state = {
    clickedButton: true,
    answers: []
  }
  // selectedAnswer = (answer, e) => {
  //   // console.log(answer)
  //   const { answers } = this.state

  //   // const newAnswer = answer.push()

  //   // this.props.dispatch(actions.AddAnswers({type: 'ADD_ANSWER': payload: answer}))
  // }

  render() {
    const { product, answers } = this.props

    //@Improve code here...
    //@Tip: Find a sync answer and product objects
    if (product) {
      if (answers) {
        return (
          <div>
            <h1>{product.question}</h1>
            <div className="row">
              {answers.map(answer => (
                <Answer
                  key={answer.id}
                  answer={answer}
                  // selectedClickedHandler={this.selectedAnswer}
                />
              ))}
              <button type="button" className="btn btn-dark btn-block">
                continue
                <i className="fa fa-arrow-right ml-2"></i>
              </button>
            </div>
            <br />
          </div>
        )
      } else {
        return <Spinner />
      }
    } else {
      return <Spinner />
    }
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'products',
      storeAs: 'answers',
      doc: props.product.id,
      subcollections: [{ collection: 'answers' }]
    } //use props to get ID from props
  ]),
  connect((state, props) => ({ answers: state.firestore.ordered.answers }))
)(PossibleAnswers)
