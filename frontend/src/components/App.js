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
        id: 12,
        pickup: null,
        dropoff: null
      },
      destination: false,
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
    this.broadcastInterval = null;
    this.resetState();
    this.channel = new RTMChannel("riders", this.recieveData.bind(this), e =>
      console.log(e)
    );
  }

  componentDidMount() {
    this.channel.publish({ hello: "world" });
  }

  resetState() {
    this.setState({
      passengerData: {
        name: "Pidgeon",
        id: Math.floor(Math.random() * 1000),
        pickup: null,
        dropoff: null
      },
      destination: false,
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
    });
  }

  sendDriver() {
    console.log("SEND DRIVER");
    clearInterval(this.broadcastInterval);
    this.broadcastInterval = setInterval(() => {
      this.channel.publish(this.state.driverData);
    }, 1000);
    console.log(this.state);
    this.channel.getTrip(this.state.driverData.id, res => {
      console.log("found a rider", res.rider);
    });
  }

  sendPassenger() {
    this.state.spotSearch(`${this.state.destination.position.lat}, ${this.state.destination.position.lng}`, (spots) => {
      this.setState({
        passengerData: {
          ...this.state.passengerData,
          pickup: spots[0],
          dropoff: spots[spots.length-1]
        }
      })

    });
  }

  recieveData(data) {
    console.log(data);
  }

  walkToStop() {
    clearInterval(this.broadcastInterval);
    this.setState({ inRange: true });
    this.broadcastInterval = setInterval(() => {
      this.channel.publish(this.state.passengerData);
    }, 1000);
    this.channel.getTrip(this.state.passengerData.id, res => {
      console.log("found a driver", res.driver);
      if (this.state.pickupData){ return null };
      this.setState({ pickupData: res.driver })
      // clearInterval(this.broadcastInterval);
    });
  }
  //passenger Tray props: inRange, inCar, pickupData (checks for presence)
  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact path="/*/*"
            render={() => <Cancel resetState={this.resetState.bind(this)} />}
          />
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
                    destination: destination
                  });
                }}
                searchDestination={queryWords => {
                  this.state.searchDestination(queryWords);
                }}
                destination={this.state.destination}
                sendDriver={this.sendDriver.bind(this)}
                sendPassenger={this.sendPassenger.bind(this)}
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
                spotSearchCallback={(cb) => this.setState({spotSearch: cb})}
                setDestination={destination => {
                  this.setState({ destination: destination });
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
            path="/app/driver"
            render={() =>
              <DriverTray passengerData={this.state.passengerData} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
