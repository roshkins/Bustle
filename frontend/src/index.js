import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//eslint-disable-next-line
ReactDOM.render(<App google={google} />, document.getElementById('root'));
registerServiceWorker();
