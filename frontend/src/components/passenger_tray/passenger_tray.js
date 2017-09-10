import React, { Component } from 'react';
import './passenger_tray.css';

class PassengerTray extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const Walk = (
      <div>Walk to pickup location</div>
    );
    const Wait = (
      <div>Wait for a car</div>
    );

    const UI = () => {
      if (this.props.inRange){
        return <Wait/>;
      } else {
        return <Walk/>;
      }
    };

    return (
      <div className="passenger-tray">
        <h2></h2>
      </div>
    );
  }
}

export default PassengerTray;
