import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Quiz extends Component {
  state = {
    Quiz: {
      title: 'How old are you'
    },
    selectedOptons: []
  }

  render() {
    const { Quiz } = this.state
    return (
      // <div className="row">

      <div>
        <Link to="/">
          <i className="fa fa-arrow-circle-left "></i>
        </Link>
        <div className="header">
          {/* <div className="overlay"></div> */}
          <div className="w-100 text-white">
            <h1 className="display-3 videoHeader text-center">{Quiz.title}</h1>
            <p className="lead mb-0 text-center">Possble Answer </p>
            {/* loop through questions for Prudct */}

            <Link
              to="/product/quiz/start"
              className="btn btn-info btn-block mt-3">
              continue
              <i className="fa fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>{' '}
      </div>
    )
  }
}

export default Quiz
