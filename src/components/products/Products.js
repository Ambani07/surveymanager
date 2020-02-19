import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

class Products extends Component {
  render() {
    const { products } = this.props

    if (products) {
      return (
        <div>
          <div className="bg-primary text-center py-5 mb-4">
            <h1 className="font-weight-light text-white">Products</h1>
          </div>

          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-xl-3 col-md-6 mb-4">
                <Link
                  to={`/product/${product.id}`}
                  className="card border-0 shadow">
                  <img src={product.image} className="card-img-top" alt="..." />
                  <div className="card-body text-center">
                    <h5 className="card-title mb-0">{product.name}</h5>
                    <div className="card-text text-black-50">
                      {product.category}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

Products.propTypes = {
  firestore: PropTypes.object.isRequired,
  products: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'products' }]),
  connect((state, props) => ({ products: state.firestore.ordered.products }))
)(Products)
