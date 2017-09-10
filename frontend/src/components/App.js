import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import PassengerTray from "./passenger_tray/passenger_tray";
import DriverTray from "./driver_tray/driver_tray";
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
        dropoff: null,
        destination: null
      },
      driverData: {
        name: "Driver8",
        id: Math.floor(Math.random() * 1000),
        spots: [],
        seatCount: 2
      },
      pickupData: null,
      searchDestination: null
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

  walkToStop() {
    this.setState({ inRange: true });
  }
  //passenger Tray props: inRange, inCar, pickupData (checks for presence)
  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Cancel} />
          <Route
            exact
            path="/"
            render={() =>
              <Welcome
                changeName={name =>
                  this.setState({
                    passengerData: { ...this.state.passengerData, name }
                  })}
              />}
          />
          <Route
            exact
            path="/app/search"
            render={() =>
              <Search
                destinationChange={destination => {
                  this.setState({
                    passengerData: { ...this.state.passengerData, destination }
                  });
                }}
                searchDestination={queryWords => {
                  this.state.searchDestination(queryWords);
                }}
              />}
          />
          <Route
            path="/app"
            render={() =>
              <Map
                searchCallback={cb => {
                  console.log("searchCallback", cb);
                  this.setState({ searchDestination: cb });
                }}
                setDestination={destination => {
                  this.setState({ passengerData: { destination } });
                }}
                google={this.props.google}
              />}
          />
          <Route
            path="/app/passenger"
            render={() =>
              <PassengerTray
                walkToStop={this.walkToStop.bind(this)}
                inRange={this.state.inRange}
                pickupData={this.state.pickupData}
                {...this.state.passengerData}
              />}
          />
          <Route 
            path='/app/driver' 
            render={ () => 
              <DriverTray 
              passengerData={this.state.passengerData}
            />} 
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
