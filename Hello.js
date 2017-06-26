import React from 'react';
import fetch from 'isomorphic-fetch';
import s from 'Hello.scss'
import PropsTypes from 'prop-types'

class Hello extends React.Component{

  constructor(props) {
    super(props)
  }
  static fetchData() {
    return fetch('http://localhost:3000/static/data.json')
      .then(r => r.json())
      .then(r => {
        return { hello: r.hello }
      })
  }

  handleClick() {
    console.log('start--------click')
  }

  render() {
    const { hello } = this.props
    return <div className={s.root}>
      <button onClick={this.handleClick}>点这里</button>
      Hello {hello}. Async hello {hello}
      { this.props.children }
    </div>
  }
}
// Hello.childContextTypes = {
//   datas: PropsTypes.object,
// }
export default Hello
