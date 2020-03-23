import React from 'react'
import { Link } from 'react-router-dom'

//Firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

const Answers = props => {
  let answers = props.answers
  let answer

  answers.length === 0
    ? (answer = <h5>You haven't set a goal</h5>)
    : (answer = answers.map(a => {
        return (
          <li className="list-group-item" key={a.id}>
            {a.text}
            <Link className="btn btn-link float-right" to="/">
              <i className="fas fa-pen text-dark"></i>edit
            </Link>
            <Link className="btn btn-link float-right" to="/">
              <i className="fas fa-pen text-dark"></i>delete
            </Link>
          </li>
        )
      }))

  return (
    <div>
      <ul className="list-group">{answer}</ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    answer: state.answers
  }
}

export default connect(mapStateToProps)(Answers)
