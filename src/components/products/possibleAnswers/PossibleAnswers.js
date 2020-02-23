/* eslint-disable no-console */
//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//React Redux Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

//Components
import Spinner from '../../layout/Spinner'

class PossibleAnswers extends Component {
  answersList(answers, productID) {
    let answersList = []
    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index]

      answersList.push(
        <button
          key={index}
          onClick={e => this.props.onSelectPossibleAnswers(answer, productID)}
          className="btn btn-outline-primary m-5">
          {answer}
          <i className="fa fa-times-circle ml-2"></i>
        </button>
      )
    }

    return answersList
  }

  render() {
    const { product } = this.props
    return (
      <div>
        <h1>{product.question}</h1>
        {this.answersList(product.possibleAnswers, product.id)}
        <br />
      </div>
    )
  }
}

export default PossibleAnswers
