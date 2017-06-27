import fs from 'fs';
import React from 'react';
import fetch from 'isomorphic-fetch';
// import Hello from './Hello.js';
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import routes from './routes.js'
import * as promise from "es6-promise"
promise.polyfill()
import { match, createMemoryHistory, RouterContext } from 'react-router'
import configStore from './configStore'
function handleRender(req, res) {
  //
  // fs.readFile('./index.html', 'utf8', function (err, file) {
  //    res.send(file)
  // })
  const store = configStore({}, createMemoryHistory())
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let taskList = []
      renderProps.components.forEach((component, idx) => {
        component.fetchData && taskList.push(component.fetchData(store.dispatch))
      })
      // fetchData执行完毕后再进行渲染
      Promise.all(taskList)
        .then(()=>{
          const reactString = ReactDOMServer.renderToString(
            <Provider store={ store }>
              <RouterContext {...renderProps}/>
            </Provider>
          )
          fs.readFile('./index.html', 'utf8', function (err, file) {
             const footString = '<script>(function(){window.__INITIAL_STATE__=' + JSON.stringify(store.getState()) + '})()</script>'
             const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>${footString}`);
             res.send(document)
          })
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}
// function handleRender(req, res) {
//   return fetch('http://localhost:3000/static/data.json')
//     .then(r => r.json())
//     .then(r => {
//       const props = {name: 'NAME', hello: r.hello}
//       const hello = React.createElement(Hello, props)
//       fs.readFile('./index.html', 'utf8', function (err, file) {
//           if (err) {
//             return console.log(err);
//           }
//           const reactString = ReactDOMServer.renderToString(hello)
//           const footString = '<script>(function(){window.__GLOBAL_STATE__=' + JSON.stringify(props) + '})()</script>'
//           const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>${footString}`);
//           res.send(document);
//       });
//     });
// }

export default handleRender;
