import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import PassengerTray from './passenger_tray/passenger_tray';
import Welcome from './welcome/welcome';
import Search from './search/search';
import Cancel from './cancel/cancel';
import Map from './map/map';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      passengerData: {
        id: Math.floor(Math.random()*1000),
        pickup: null,
        dropoff: null,
      }
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Cancel} />
          <Route exact path='/' component={Welcome} />
          <Route exact path='/search' render={() => <Search {...this.state}/>}/>
          <Route path='/search' component={Map} />
          <Route exact path='/passenger' component={PassengerTray} />
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
