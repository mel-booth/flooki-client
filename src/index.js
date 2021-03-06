var redux = require('redux')
var morphdom = require('morphdom')

var reducer = require('./reducer')
var login = require('./components/login')
var home = require('./components/home')
var target = require('./components/target')
var user = require('./components/user')
var signup = require('./components/signup')
var follows = require('./components/follows')
var App = require('./components/app')

var followRefresh = require('./components/refreshFunctions/followEntries')
var homeRefresh = require('./components/refreshFunctions/homeEntries')
var targetRefresh = require('./components/refreshFunctions/targetEntries')
var userRefresh = require('./components/refreshFunctions/userEntries')

var app = document.createElement('div')
document.querySelector('main').appendChild(app)

var initialState = {
  title: 'flooki',
  view: 'login',
  user: null,
  authError: null,
  isLoading: false,
  entries: [],
  followEntries: [],
  myFollowing: [],
  myEntries: [],
  targetEntries: [],
  targetId: null,
  myFlukes: [],
  entryForComments: null,
  entryComments: []
}

var store = redux.createStore(reducer, initialState)
const {getState, dispatch, subscribe} = store
subscribe(() => {
  var view = render(getState(), dispatch)
  morphdom(app, view)
})

function render (state, dispatch) {
  switch (state.view) {
    case 'login':
      return App(state, dispatch, login)
    case 'signup':
      return App(state, dispatch, signup)
    case 'home':
      return App(state, dispatch, home, homeRefresh)
    case 'follows':
      return App(state, dispatch, follows, followRefresh)
    case 'target':
      return App(state, dispatch, target, targetRefresh)
    case 'me':
      return App(state, dispatch, user, userRefresh)
    default:
      return App(state, dispatch, login)
  }
}

store.dispatch({type: 'INIT'})
