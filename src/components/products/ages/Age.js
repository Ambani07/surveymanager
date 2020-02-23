import React, { Component } from 'react'

import Spinner from '../../layout/Spinner'

export default class Age extends Component {
  render() {
    const { age, onAgeGroup } = this.props
    if (age) {
      return (
        <div>
          <button
            key={age.id}
            to={`/product/quiz/${age.id}/start`}
            className="btn btn-outline-primary m-5">
            {age.title}
            <i className="fa fa-times-circle ml-2"></i>
          </button>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}
