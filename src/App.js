import React, { Component } from 'react'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import { rrfProps, store } from './store/store'

import AppNavbar from './components/layout/AppNavbar'

// APPLICATION COMPONENTS
//DASHBOARD
import Dashboard from './components/layout/Dashboard'

//Client CRUD
import Clients from './components/clients/Clients'
import AddClients from './components/clients/AddClients'
import EditClient from './components/clients/EditClient'
import ClientDetails from './components/clients/ClientDetails'

//Auth
import Login from './components/auth/Login'

//Quiz
import Quiz from './components/products/quiz/Quiz'

//Page Not Found
import NotFound from './components/notfound/NotFound'

// Products CRUD
import Products from './components/products/Products'
import ProductDetails from './components/products/ProductDetails'

// CSS
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
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}></Route>
                  {/* Auth */}
                  <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>
                  {/* Client Routes */}
                  <Route
                    exact
                    path="/client/add"
                    component={UserIsAuthenticated(AddClients)}></Route>
                  <Route
                    exact
                    path="/client/:id"
                    component={UserIsAuthenticated(ClientDetails)}></Route>
                  <Route
                    exact
                    path="/client/edit/:id"
                    component={EditClient}></Route>
                  {/* Product Routes */}
                  <Route
                    exact
                    path="/products"
                    component={UserIsAuthenticated(Products)}></Route>
                  <Route
                    exact
                    path="/product/:id"
                    component={UserIsAuthenticated(ProductDetails)}></Route>
                  {/* Quiz Routes */}
                  <Route
                    exact
                    path="/product/:id/quiz"
                    component={UserIsAuthenticated(Quiz)}></Route>
                  {/* Page Not Found */}
                  <Route component={UserIsAuthenticated(NotFound)}></Route>
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
