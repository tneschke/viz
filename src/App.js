
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Provider } from './Context';



class App extends Component {

  constructor(props) {
    super(props);

    this.updateContext = (context) => {
      localStorage.setItem('myData', JSON.stringify(context));
      this.setState(context)
    }

}
  render() {
    return (
        <Provider value={this.state}>         
          <Routes />
        </Provider>
    );
  }
}

export default App;

