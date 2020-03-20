import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

//Actions
import { notifyUser } from '../../actions/notifyActions'
import Alert from '../layout/Alert'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault()

    const { firebase, notifyUser } = this.props
    const { email, password } = this.state

    firebase
      .login({ email: email, password: password })
      .catch(err => notifyUser('Invalid login details!...', 'error'))
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { message, messageType } = this.props.notify
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pd-4 pt-3">
                <span className="text-primary">
                  <i className="fa fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    defaultValue={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    defaultValue={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
}

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login)
