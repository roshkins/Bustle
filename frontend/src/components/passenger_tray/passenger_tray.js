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
            <p>{this.props.pickupData.name} (friends with Clair) is arriving in {this.props.pickupData.time || 6} minutes</p>
          </div>
        );
      }
      if (this.props.inCar){
        return (
          <div><p>Get Off at {this.props.dropoff}</p></div>
        );
      } else if (this.props.inRange){
        return (
          <div><p>Wait for a car</p></div>
        );
      } else {
        return (
          <div>
            <p>Walk to pickup location</p>
            <button
              onClick={this.props.walkToStop}>
              I'm Here
            </button>
          </div>
        );
      }
    };

    return (
      <div className="tray">
        <UI/>
      </div>
    );
  }
}

export default PassengerTray;
