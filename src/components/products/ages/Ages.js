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
  state = { ageGroup: '' }
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.onAgeGroup = this.onAgeGroup.bind(this)
  }

  onAgeGroup = (id, e) => {
    this.setState({
      ageGroup: id
    })
    console.log(this.state.ageGroup)
  }
  //Delete Click
  render() {
    const { ages } = this.props
    if (ages) {
      return (
        <div>
          <h1 className="display-3 videoHeader text-center p-5">
            Hey there!...Before we get started, how old are you?
          </h1>
          {ages.map(age => (
            <button
              key={age.id}
              // to="/product/quiz/start"
              className="btn btn-outline-primary m-5"
              onClick={e => this.onAgeGroup(age.id, e)}>
              {age.title}
              <i className="fa fa-times-circle ml-2"></i>
            </button>
          ))}
        </div>
      )
    } else {
      return (
        <div>
          <Spinner />
        </div>
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

// export default compose(
//     firestoreConnect([{ collection: 'products' }]),
//     connect((state, props) => ({ products: state.firestore.ordered.products }))
//   )(Products)
