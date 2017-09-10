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
    const InCar = (
      <div>Get Off at {this.props.dropoff}</div>
    );
    const UI = () => {
      if (this.props.pickupData){
        return (
          <div className="alert">
            {this.props.pickupData.driverName} (friends with Clair) is arriving in {this.props.pickupData.time} minutes
          </div>
        )
      }
      if (this.props.inCar){
        return InCar;
      } else if (this.props.inRange){
        return Wait;
      } else {
        return Walk;
      }
    };

    return (
      <div className="passenger-tray">
        <h2></h2>
        <UI/>
      </div>
    );
  }
}

export default PassengerTray;
