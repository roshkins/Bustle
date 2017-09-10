import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import PassengerTray from "./passenger_tray/passenger_tray";
import Welcome from "./welcome/welcome";
import Search from "./search/search";
import Cancel from "./cancel/cancel";
import Map from "./map/map";

import RTMChannel from "../util/rtm_channel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passengerData: {
        name: "Pidgeon",
        id: Math.floor(Math.random() * 1000),
        pickup: null,
        dropoff: null
      },
      driverData: {
        name: "Driver8",
        id: Math.floor(Math.random() * 1000),
        spots: [],
        seatCount: 2,
      },
      pickupData:null
      //  {
      //   driverName: "Blair",
      //   time: 5,
      // },
    };
    this.channel = new RTMChannel("riders", this.recieveData, e =>
      console.log(e)
    );
  }

  componentDidMount() {
    this.channel.publish({ hello: "world" });
  }

  recieveData(data) {
    console.log(data);
  }

  walkToStop(){
    this.setState({inRange: true});
  }
  //passenger Tray props: inRange, inCar, pickupData (checks for presence)
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Cancel} />
          <Route exact path='/' component={Welcome} />
          <Route exact path='/app/search' render={() => <Search {...this.state}/>}/>
          <Route path='/app' render={() => <Map google={this.props.google}/> } />
          <Route path='/app/passenger' render={() => <PassengerTray walkToStop={this.walkToStop.bind(this)} inRange={this.state.inRange} pickupData={this.state.pickupData} {...this.state.passengerData} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
