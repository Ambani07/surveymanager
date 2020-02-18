import React, { Component } from 'react'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom'

import { rrfProps, store } from './store/store'

import AppNavbar from './components/layout/AppNavbar'
import Clients from './components/clients/Clients'
import AddClients from './components/clients/AddClients'
import ClientDetails from './components/clients/ClientDetails'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Setup react-redux so that connect HOC can be used
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <div>
            {/* <Header branding="Survey Manager"/> */}

            <BrowserRouter>
              <AppNavbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Clients}></Route>
                  <Route
                    exact
                    path="/client/add"
                    component={AddClients}></Route>
                  <Route
                    exact
                    path="/client/:id"
                    component={ClientDetails}></Route>
                </Switch>
              </div>
            </BrowserRouter>
          </div>
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
}

export default App
