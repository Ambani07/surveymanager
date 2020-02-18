import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Contacts from './Contacts'

export default function createRoutes(store) {
  return (
    <Switch>
      <Route
        exact
        path={Contacts.path}
        component={() => <Contacts.component />}
      />
    </Switch>
  )
}
