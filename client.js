import React from 'react'
import ReactDOM from "react-dom"
import routes from './routes.js'
import { Router, browserHistory } from "react-router"
import { Provider } from 'react-redux'
import reducer from './reducers'
import { syncHistoryWithStore } from 'react-router-redux';
import configStore from './configStore'

const initialState = window.__INITIAL_STATE__
const store = configStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return
  }
  const { routes } = this.state
  const defaultDataHandler = () => Promise.resolve()
  const matchedRoute = routes[routes.length - 1]
  const fetchDataHandler = matchedRoute.component
    && matchedRoute.component.fetchData || defaultDataHandler
  fetchDataHandler(store.dispatch)
}

((window, document) => {
  ReactDOM.render(
    <Provider store={store}>
       <Router history={history} routes={routes} onUpdate={onUpdate}/>
    </Provider>,
    document.getElementById('app')
  )
})(window, document)
