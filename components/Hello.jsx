import React from 'react';
import fetch from 'isomorphic-fetch';
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions'
class Hello extends React.Component {
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
    return getData().then(data => {
      console.log('hello fetch---', data)
      dispatch({ type: 'REQUEST_SUCCESS', data: data })
    }).catch(err => {
      dispatch({ type: 'REQUEST_FAILURE'})
    })
  }
  handleClick() {
    this.props.logout()
  }
  render() {
    const { initialData, isLogin } = this.props
    return <div >
      <button onClick={this.handleClick}>Hello</button>
      Hello { initialData && initialData.data || ''}
      { isLogin ? <span>已登录</span> : <span>未登录</span> }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    initialData: state.hello.value,
    isLogin: state.isLogin
  }
}
const mapDispatchToProps = {
  logout,
}
export default connect(mapStateToProps, mapDispatchToProps)(Hello)
