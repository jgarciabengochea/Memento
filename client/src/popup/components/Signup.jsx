import React, { Component } from 'react';
import axios from 'axios';
import sendChromeMessage from './../../controllers/sendChromeMessage.js';
import { LOCAL_IP } from './../../../../config.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  submitSignup() {
    let data = this.state;
    // returns username on successful signup
    axios.post(`http://${LOCAL_IP}:3000/momento/signup`, data)
      .then(({ data }) => {console.log(data); sendChromeMessage('background', 'returnHome', 'Home')})
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <div>
          <label>
            E-mail
            <input 
              type='email' 
              name='email' 
              value={this.state.email} 
              onChange={this.handleInput}
            />
          </label>
        </div>
        <div>
          <label>
            Username
            <input 
              type='text' 
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
        <button onClick={this.submitSignup}>Signup!</button>
      </div>
    )
  }
}