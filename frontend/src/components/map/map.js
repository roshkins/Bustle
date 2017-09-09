import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './map.css';

class Map extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="map">
        <h2>MAP</h2>
      </div>
    );
  }
}

export default Map;
