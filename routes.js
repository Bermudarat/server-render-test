import { Router, Route} from 'react-router'
import App from './components/App.jsx'
import Hello from './components/Hello.jsx'
import About from './components/About.jsx'
export default {
  component: App,
  childRoutes: [{
    path: 'about',
    component: About
  }, {
    path: 'hello',
    component: Hello
  }]
  // childRoutes: [
  //   {
  //     path: '/about',
  //     getComponent: (location, cb) => {
  //       cb(null, About)
  //     }
  //   },
  //   {
  //     path: '/hello',
  //     getComponent: (location, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, Hello)
  //       })
  //     }
  //   },
  // ]
}
