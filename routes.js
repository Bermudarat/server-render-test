import { Router, Route} from 'react-router'
import Hello from 'Hello'
import About from './About.js'
export default {
  component: Hello,
  childRoutes: [
    {
      path: '/About',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, About)
        })
      }
    }
  ]
}
