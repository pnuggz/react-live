import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    }
  }
};

componentDidMount() {
  fetch('http://api.dailysportboss.com/login/submit', {
    method: 'POST'
  })
  .then(results => {
    return results.json();
  }).then(data => {
    console.log(data);
  })
};

render() {
  return (
    <div>Success</div>
  )
}

export default Login;