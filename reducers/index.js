import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

const hello = (state = {
  isFetching: false,
  value: null
}, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'REQUEST_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        value: action.data
      })
    case 'REQUEST_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        value: null
      })
    default:
      return state
  }
}
const isLogin = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}
// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  hello,
  isLogin,
  routing
});

export default rootReducer;
