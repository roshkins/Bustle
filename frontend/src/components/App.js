import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import PassengerTray from './passenger_tray/passenger_tray';
import Welcome from './welcome/welcome';
import Search from './search/search';
import Cancel from './cancel/cancel';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Cancel} />
          <Route exact path='/' component={Welcome} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/passenger' component={PassengerTray} />
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
