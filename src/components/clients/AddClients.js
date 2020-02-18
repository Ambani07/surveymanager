import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddClients extends Component {
  //input elements state
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: ''
  }

  //create state for input
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  onSubmit = e => {
    e.preventDefault()
    const newClient = this.state
    const { firestore, history } = this.props

    //validation
    //If null balance, make 0
    if (newClient.balance === '') {
      newClient.balance = 0
    }

    //add client to firestore
    firestore
      .add({ collection: 'clients' }, newClient)
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
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
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

AddClients.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(AddClients)
