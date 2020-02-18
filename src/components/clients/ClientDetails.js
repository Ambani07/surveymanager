/* eslint-disable no-console */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import classnames from 'classnames'

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false, //show form
    balanceUpdateAmount: ''
  }

  balanceSubmit = e => {
    e.preventDefault()
    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }

    //update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
    // console.log(this.state.balanceUpdateAmount)
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value })
  render() {
    //get client from properties
    const { client } = this.props
    const { showBalanceUpdate, balanceUpdateAmount } = this.state

    //store form
    let balanceForm = ''
    //If balance form should display
    if (showBalanceUpdate) {
      //construct form
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      )
    } else {
      balanceForm = null
    }
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstname} {client.lastname}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID: <span className="text-secondary"></span>
                    {client.id}
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0
                      })}>
                      R{parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }>
                        <i className="fa fa-pencil-alt"></i>{' '}
                      </a>
                    </small>
                  </h3>
                  {/* @todo -balance form */}
                  {balanceForm}
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

ClientDetails.propType = {
  firestore: PropTypes.object.isRequired
}

//connect and get's client from firestore
//create single client in state
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id } //use props to get ID from props
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    //set state from ordered property
    client: ordered.client && ordered.client[0] //get first item from array
  }))
)(ClientDetails)
