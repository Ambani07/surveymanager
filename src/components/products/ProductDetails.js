//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

//Components
import ProductStats from './ProductStats'
import Spinner from '../layout/Spinner'

//CSS
import './Products.css'
class ProductDetails extends Component {
  image(image) {
    if (image) {
      return <img class="card-img-top" src={image} alt="" />
    } else {
      return <Spinner />
    }
  }
  render() {
    const { product } = this.props
    if (product) {
      return (
        <div>
          <div className="header">
            {/* <div className="overlay"></div> */}
            {this.image(product.image)}
            <div className="container h-100">
              <div className="d-flex h-100 text-center align-items-center">
                <div className="w-100 text-white">
                  <h1 className="display-3 videoHeader">{product.name}</h1>
                  <p className="lead mb-0 category">{product.category}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <ProductStats />
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/product/quiz/start"
                        className="btn btn-info btn-block mt-3">
                        <i className="fa fa-add"></i>
                        Start Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <section className="my-5">
                <div className="container"></div>
              </section>{' '}
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

ProductDetails.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    { collection: 'products', storeAs: 'product', doc: props.match.params.id } //use props to get ID from props
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //set state from ordered property
    product: ordered.product && ordered.product[0] //get first item from array
  }))
)(ProductDetails)
