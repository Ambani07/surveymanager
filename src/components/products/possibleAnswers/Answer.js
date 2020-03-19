//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

//Components
import Spinner from '../../layout/Spinner'
class Answer extends Component {
  state = {
    clickedButton: false
  }
  // selectClickHandler = (answer, dispatch,  e) => {
  selectClickHandler = (answer, selectedAnswers, e) => {
    // this.props.selectedClickedHandler(answer)
    // selectedAnswers({ type: 'ADD_ANSWER', payload: answer })
    // this.props.selectedAnswers({})
    console.log(answer)
  }
  render() {
    const { answer, selectedAnswers } = this.props
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
            onClick={this.selectClickHandler.bind(
              this,
              answer,
              selectedAnswers
            )}>
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

// const mapStateToProps = props => {
//   return {
//     selectedAnswers: props.selectedAnswers.answers
//   }
// }

Answer.propTypes = {
  answer: PropTypes.object.isRequired
  // selectedClickedHandler: PropTypes.func.isRequired
}

export default Answer
