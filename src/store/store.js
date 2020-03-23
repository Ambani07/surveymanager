import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { firebaseReducer, getFirebase } from 'react-redux-firebase'
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore
} from 'redux-firestore' // <- needed if using firestore
import { firebaseConfig as fbConfig } from '../config'

//Middleware
import thunk from 'redux-thunk'

//Reducers
import notifyReducer from '../reducers/notifyReducers'
import settingsReducer from '../reducers/settingsReducer'
import answersReducers from '../reducers/answersReducers'
import createAnswer from './reducers/createAnswer'

// react-redux-firebase config
export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const middlewares = [thunk.withExtraArgument(getFirebase)]

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
  answers: createAnswer
  // answers: answersReducers
})

//check for settings and localstorage
if (localStorage.getItem('settings') == null) {
  //Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  //set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

//create store
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore })),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export default {
  rrfProps,
  store
}
