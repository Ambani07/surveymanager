/* eslint-disable no-console */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

import Answers from './Answers'

import uuid from 'react-uuid'

import produce from 'immer'

//Actions
import { addAnswer } from '../../actions/answersActions'
import { createAnswerAction } from '../../store/actions/createAnswer'

class AddAnswers extends Component {
  //input elements state
  state = {
    text: ''
  }
  //create state for input
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  getAnswer = e => {
    e.preventDefault()
    const { createAnswerAction } = this.props
    const { text } = this.state
    if (text !== '') {
      createAnswerAction({ id: uuid(), text: text })
      this.setState({ text: '' })
    }
    // firestore
    //   .update({ collection: 'products', doc: product.id }, answers)
    //   .then(history.push('/'))
  }
  render() {
    const { product, answers } = this.props
    if (product) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="row">
            <form className="form-inline m-2" onSubmit={this.getAnswer}>
              <div className="form-group col-md-8">
                <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                    this.setState({ text: e.target.value })
                  }}
                  value={this.state.text}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.getAnswer}>
                  Add Answer
                </button>
              </div>
            </form>
          </div>
          <Answers answers={answers} />
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

AddAnswers.propTypes = {
  firebase: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    createAnswer: answer => {
      dispatch(createAnswerAction(answer))
    }
  }
}
export default compose(
  firestoreConnect(props => [
    { collection: 'products', storeAs: 'product', doc: props.match.params.id }
  ]),
  connect(
    ({ firestore: { ordered }, settings, answers }, props) => ({
      product: ordered.product && ordered.product[0],
      settings: settings,
      answers: answers
    }),
    { addAnswer, mapDispatchToProps, createAnswerAction }
  )
)(AddAnswers)
