import React from 'react';
import PropsTypes from 'prop-types'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return <div> { this.props.children }</div>
  }
}
export default App
