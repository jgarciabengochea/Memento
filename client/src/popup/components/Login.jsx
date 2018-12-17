import React, { Component } from 'react';
import axios from 'axios';
import { LOCAL_IP } from './../../../../config.js';
import sendChromeMessage from './../../controllers/sendChromeMessage.js';
// TODO: validate username before sendng request
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  submitLogin() {
    let username = this.state.username;
    let password = this.state.password;
    axios.post(`http://${LOCAL_IP}:3000/momento/login`, { username, password })
      .then(({ data }) => {console.log(data); sendChromeMessage('background', 'returnHome', 'Home')})
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Username
            <input 
              type='username' 
              name='username' 
              value={this.state.username} 
              onChange={this.handleInput}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input 
            type='password' 
            name='password' 
            value={this.state.password} 
            onChange={this.handleInput}
          />
          </label>
        </div>
        <button onClick={this.submitLogin}>Login!</button>
        <button onClick={() => {sendChromeMessage('background', 'signup', 'Signup')}}>Signup for an account!</button>
      </div>
    )
  }
}