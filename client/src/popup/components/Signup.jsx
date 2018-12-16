import React, { Component } from 'react';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
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
            Password
            <input 
            type='password' 
            name='password' 
            value={this.state.password} 
            onChange={this.handleInput}
          />
          </label>
        </div>
      </div>
    )
  }
}