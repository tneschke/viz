import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from "react-router-dom";


ReactDOM.render(
    <Router basename="/colorvisual">
      <App />
    </Router>,
    document.getElementById("root")
  );

serviceWorker.unregister();

