import React from 'react'
// import Transmit from 'react-transmit';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { login } from '../actions'
import { Link } from 'react-router'
import Message from './Message.jsx'
import * as promise from "es6-promise"
promise.polyfill()
class About extends React.Component{
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  static fetchData(dispatch) {
    dispatch({type: 'CREATE_REQUEST'})
    const getData = () => {
      return fetch('http://localhost:3000/static/data.json')
        .then(r => r.json())
        .then(r => {
          return { data: r.hello }
        })
    }
    const taskList = [getData(), Message.getData()]
    return Promise.all(taskList)
      .then(datas => {
        console.log(datas[0].data)
        dispatch({ type: 'REQUEST_SUCCESS', data: datas[0].data })
      }).catch(err => {
        dispatch({ type: 'REQUEST_FAILURE'})
      })
  }
  handleClick() {
    this.props.login()
  }
  render() {
    const { initialData, isLogin } = this.props
    return <div >
      <button onClick={this.handleClick}>About</button>
      Hello { initialData || ''}
      { isLogin ? <span>已登录</span> : <span>未登录</span> }
      <Link to="/hello">go to hello</Link>
      <Message />
    </div>
  }
}

const mapStateToProps = (state) => {
  console.log('state-------', state)
  return {
    initialData: state.hello.value,
    isLogin: state.isLogin
  }
}
const mapDispatchToProps = {
  login,
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
