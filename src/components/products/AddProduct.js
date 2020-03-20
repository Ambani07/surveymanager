import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddProduct extends Component {
  //input elements state
  state = {
    name: '',
    image: '',
    question: '',
    category: ''
  }

  //create state for input
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  onSubmit = e => {
    e.preventDefault()
    const newProduct = this.state
    const { firestore, history } = this.props

    //validation

    //add client to firestore
    firestore
      .add({ collection: 'products' }, newProduct)
      .then(() => history.push('/'))
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left"></i>
              Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Product</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.image}
                />
              </div>
              <div className="form-group">
                <label htmlFor="question">Question</label>
                <input
                  type="question"
                  className="form-control"
                  name="question"
                  onChange={this.onChange}
                  value={this.state.question}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.category}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddProduct.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddProduct)
