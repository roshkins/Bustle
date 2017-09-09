import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './search.css';

class Search extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="search">
        <label>
        <input type='text'></input>
        </label>
        <Link to='/driver'><button>Drive</button></Link>
        <Link to='/passenger'><button>Ride</button></Link>
      </div>
    );
  }
}

export default Search;
