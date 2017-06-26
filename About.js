import React from 'react';
// import Transmit from 'react-transmit';
import fetch from 'isomorphic-fetch';
import s from 'Hello.scss';

class About extends React.Component{

  render() {
    return <div className={s.root}>
      <button onClick={this.handleClick}>About</button>
      Hello {this.props.name}. Async hello {JSON.stringify(this.props.hello)}
    </div>
  }
}

export default About
