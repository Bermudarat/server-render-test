import React from 'react'
import Transmit from 'react-transmit'
import Hello from 'Hello'
import About from './About.js'
import ReactDOM from "react-dom"
import routes from './routes.js'
import { Router, browserHistory } from "react-router"

((window, document) => {
  const props = window.__GLOBAL_STATE__
  ReactDOM.render(
    // <Hello  {...props} />,
    <div>
       <Router history={browserHistory} routes={routes}/>
    </div>,
    document.getElementById('app')
  )
})(window, document)
