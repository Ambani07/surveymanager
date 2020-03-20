import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { firebaseConfig as fbConfig } from '../config'

//Reducers
import notifyReducer from '../reducers/notifyReducers'
import settingsReducer from '../reducers/settingsReducer'
import answersReducers from '../reducers/answersReducers'

// react-redux-firebase config
export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

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
  answers: answersReducers
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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
