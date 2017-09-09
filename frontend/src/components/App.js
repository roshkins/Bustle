import React, { Component } from 'react';
import './App.css';
import PassengerTray from './passenger_tray/passenger_tray';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bustle</h2>
        </div>
        <PassengerTray/>
      </div>
    );
  }
}

export default App;
