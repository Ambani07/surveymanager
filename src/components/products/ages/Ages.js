/* eslint-disable no-console */
//React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

//Components
import Spinner from '../../layout/Spinner'

class Ages extends Component {
  //Delete Click
  render() {
    const { ages } = this.props
    if (ages) {
      return (
        <React.Fragment>
          <h1 className="display-3 videoHeader text-center p-5">
            Hey there!...Before we get started, how old are you?
          </h1>
          {ages.map(age => (
            <button
              key={age.id}
              className="btn btn-outline-primary m-5"
              onClick={e => this.props.onAgeSelect(age.id)}>
              {age.title}
              <i className="fa fa-times-circle ml-2"></i>
            </button>
          ))}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Spinner />
        </React.Fragment>
      )
    }
  }
}

Ages.propTypes = {
  firestore: PropTypes.object.isRequired,
  age: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'ages' }]),
  connect((state, props) => ({
    ages: state.firestore.ordered.ages
  }))
)(Ages)
