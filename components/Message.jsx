import React from 'react'
import fetch from 'isomorphic-fetch'

class Message extends React.Component{
  constructor(props) {
    super(props)
  }
  static getData() {
    return fetch('http://localhost:3000/static/data.json')
      .then(r => r.json())
      .then(r => {
        return { data: r.hello }
      })
  }
  render() {
    return <div> message </div>
  }
}
export default Message
