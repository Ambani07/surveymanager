//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//Components
import Ages from '../ages/Ages'

class Quiz extends Component {
  render() {
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
              <Ages />
              <Link
                to="/product/quiz/start"
                className="btn btn-info btn-block mt-3">
                continue
                <i className="fa fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
        {/* loop through questions for Prudct */}
      </div>
    )
  }
}

export default Quiz
