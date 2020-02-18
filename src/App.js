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

import Clients from './components/clients/Clients'

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
            <div className="container">
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Clients}></Route>
                  {/* <Route exact path="/test" component={Test}></Route> */}
                  {/* <Route component={NotFound}></Route> */}
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
}

export default App
