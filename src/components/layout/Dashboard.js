import React from 'react'
import Clients from '../clients/Clients'
import Sidebar from '../layout/Sidebar'

import Products from '../products/Products'

export default () => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Products />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  )
}
