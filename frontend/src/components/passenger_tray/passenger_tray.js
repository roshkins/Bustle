import React, { Component } from 'react';
import './passenger_tray.css';

class PassengerTray extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const UI = () => {
      if (this.props.pickupData){
        return (
          <div className="alert">
            {this.props.pickupData.driverName} (friends with Clair) is arriving in {this.props.pickupData.time} minutes
          </div>
        );
      }
      if (this.props.inCar){
        return (
          <div>Get Off at {this.props.dropoff}</div>
        );
      } else if (this.props.inRange){
        return (
          <div>Wait for a car</div>
        );
      } else {
        return (
          <div>
            Walk to pickup location <br></br>
            <button
              onClick={this.props.walkToStop}>
              I'm Here
            </button>
          </div>
        );
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
