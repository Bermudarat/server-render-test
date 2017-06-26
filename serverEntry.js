import fs from 'fs';
import React from 'react';
import fetch from 'isomorphic-fetch';
// import Hello from './Hello.js';
import ReactDOMServer from 'react-dom/server'
import routes from './routes.js'
import * as promise from "es6-promise"
promise.polyfill()
import { match, RouterContext } from 'react-router'
function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    let taskList = []
    renderProps.components.forEach((component, idx) => {
      component.fetchData && taskList.push(component.fetchData())
    })
    Promise.all(taskList).then( datas => {
      const props = datas.reduce((sum, data) => {
        return Object.assign(sum, data)
      }, {})
      console.log('-----------', props)
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const reactString = ReactDOMServer.renderToString(
          //将props防止在div的属性上，方便client
          <div datas = { props }>
            <RouterContext {...renderProps}/>
          </div>
        )
        fs.readFile('./index.html', 'utf8', function (err, file) {
           const footString = '<script>(function(){window.__GLOBAL_STATE__=' + JSON.stringify(props) + '})()</script>'
           const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>${footString}`);
           res.send(document)
        })
      } else {
        res.status(404).send('Not found')
      }
    })
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
