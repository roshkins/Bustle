import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cancel.css';

class Cancel extends Component {
  render() {
    return (
      <div className="cancel">
        <Link to='/'><button>Cancel</button></Link>
      </div>
    );
  }
}

export default Cancel;
