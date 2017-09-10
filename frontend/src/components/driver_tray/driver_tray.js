import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import './driver_tray.css';

class DriverTray extends Component {
  render() {
    const passenger = this.props.passengerData;
    return (
      <div className="tray">
        <Route path='/app/driver/confirm' render={() => (
          <div>
            <p>I have <input type='number' defaultValue={2}></input> extra seats</p>
            <br></br>
            <Link to='/app/driver/driving'><button>Start Driving</button></Link>
          </div>
        )}/>
        <Route path='/app/driver/driving' render={() => (
          <div>listening for passengers</div>
        )}/>
        <Route path='/app/driver/alert' render={() => (
          <div className='alert'>
            <p>{passenger.name} (friends of Clair) is waiting at {passenger.pickup}</p>
            <Link to='/app/driver/driving'><button>Decline</button></Link>
            <Link to='/app/driver/pickup'><button>Pickup</button></Link>
          </div>
        )}/>
        <Route path='/app/driver/pickup' render={() => (
          <div><p>pick up {passenger.name} at {passenger.pickup}</p></div>
        )}/>
      </div>
    );
  }
}

export default DriverTray;
