//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

//Components
import Spinner from '../../layout/Spinner'

//Actions
import { addAnswer } from '../../../actions/answersActions'
class Answer extends Component {
  state = {
    clickedButton: false
  }

  selectClickHandler = (answer, e) => {
    const { addAnswer } = this.props

    addAnswer(answer)
    this.setState({ clickedButton: !this.state.clickedButton })
  }
  render() {
    const { answer } = this.props
    const { clickedButton } = this.state
    if (answer) {
      return (
        <div className="col-xl-3 col-md-6 mb-4">
          <button
            className={
              clickedButton
                ? 'btn btn-primary m-5'
                : 'btn btn-outline-primary m-5'
            }
            onClick={this.selectClickHandler.bind(this, answer)}>
            {answer.title}
            <i className="fa fa-times-circle ml-2"></i>
          </button>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      answers: state.answers
    }),
    { addAnswer }
  )
)(Answer)
