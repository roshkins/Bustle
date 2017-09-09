import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1>Bustle</h1>
        <h2>instant ride pairing with friendly commuters</h2>
        <label> name
          <input type='text'></input>
        </label>
        <Link to='/search'><button>Sign In</button></Link>
      </div>
    );
  }
}

export default Welcome;
