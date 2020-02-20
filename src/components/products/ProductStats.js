//React
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductStats extends Component {
  render() {
    return (
      <div>
        <Link to="/product/start" className="btn btn-info btn-block mt-3">
          <i className="fa fa-add"></i>
          Product Stats
        </Link>
      </div>
    )
  }
}

export default ProductStats
