import React, { Component } from 'react';
import './App.css';
import PassengerTray from './passenger_tray/passenger_tray';
import Welcome from './welcome/welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Welcome/>
        </div>
        <PassengerTray/>
      </div>
    );
  }
}

export default App;
