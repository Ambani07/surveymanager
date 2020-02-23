/* eslint-disable no-console */
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

//Components
import Ages from '../ages/Ages'
import PossibleAnswers from '../possibleAnswers/PossibleAnswers'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productID: '',
      age: '',
      answers: []
    }
  }

  onAgeSelect = id => {
    this.setState({ age: id })

    if (this.state.age !== '') {
      console.log(this.state.age)
    }
  }

  onSelectPossibleAnswers = (answer, productID) => {
    // const { answers } = this.state
    const newPossibleAnswers = {
      answers: this.state.answers.concat(answer),
      productID: productID
    }
    this.setState(newPossibleAnswers)
    console.log(this.state)
    if (this.state.answers !== '') {
      console.log(this.state)
    }
  }

  displayQuestion(product) {
    const { age } = this.state

    if (age === '') {
      return <Ages onAgeSelect={this.onAgeSelect.bind(this)} />
    } else {
      return (
        <div>
          <PossibleAnswers
            product={product}
            onSelectPossibleAnswers={this.onSelectPossibleAnswers.bind(this)}
          />
          <button type="button" className="btn btn-dark btn-block">
            continue
            <i className="fa fa-arrow-right ml-2"></i>
          </button>
        </div>
      )
    }
  }

  render() {
    const { product } = this.props
    if (product) {
      return (
        // <div className="row">

        <div>
          <Link to="/" className="btn btn-primary">
            <i className="fa fa-arrow-circle-left "></i>
          </Link>
          <div className="header">
            {/* <div className="overlay"></div> */}
            <div className="w-100 text-dark">
              <div className="text-center">
                <h1>{product.name}</h1>
                {this.displayQuestion(product)}
              </div>
            </div>
          </div>
          {/* loop through questions for Prudct */}
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'products', storeAs: 'product', doc: props.match.params.id } //use props to get ID from props
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //set state from ordered property
    product: ordered.product && ordered.product[0] //get first item from array
  }))
)(Quiz)
