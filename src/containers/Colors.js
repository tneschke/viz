import React, { Component } from "react";
import Context from "../Context";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Slider, Button } from "antd";
import "../App.css";
import TreeMap from "react-d3-treemap";

import "react-d3-treemap/dist/react.d3.treemap.css";

import { SliderPicker } from "react-color";
import Redirect from "react-router-dom/Redirect";

import { data } from "./data.ts"

export default class Colors extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
  }

  state = {
    context: {},
    people: "",
    sharing: true,
    hue: 1.1,
    color: "",
    page: 0,
    tests: [
      { hue: 5, guess: 0 },
      { hue: 105, guess: 0 },
      { hue: 205, guess: 0 },
      { hue: 305, guess: 0 },
      { hue: 25, guess: 0 },
      { hue: 125, guess: 0 },
      { hue: 225, guess: 0 },
      { hue: 325, guess: 0 },
      { hue: 45, guess: 0 },
      { hue: 145, guess: 0 },
      { hue: 245, guess: 0 },
      { hue: 345, guess: 0 },
      { hue: 65, guess: 0 },
      { hue: 165, guess: 0 },
      { hue: 265, guess: 0 },
      { hue: 85, guess: 0 },
      { hue: 185, guess: 0 },
      { hue: 285, guess: 0 },
    ],
  };

  componentDidMount() {
    const context = this.context;
    this.setState({ context });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChangeComplete = (color) => {
    this.setState({ hue: color.hsl.h, color: color });
  };

  nextColor = () => {
    let tests = this.state.tests;
    tests[this.state.page].guess = this.state.hue;
    this.setState({ page: this.state.page + 1, tests: tests });
  };

  handleSubmit = () => {
    if (this.state.people.length < 1) {
      this.setState({ error: "Please enter number of people" });
      return false;
    }
    let context = this.context;
    let house = {
      user: context.context.users[context.context.userId].username,
      people: this.state.people,
      sharing: String(this.state.sharing),
      cost: this.state.cost,
      comments: [],
    };
    context.context.houses.push(house);
    this.context.updateContext(context);
    this.props.history.push("/houses");
  };

  render() {
    console.log(this.state.hue);
    return (
      <div>
      <div className="title">
      Russain Troll Treemap
      </div> 
      <div className="subtitle">
      View the top 20 terms used in Russain troll tweets, and click to view top subsequent term.
      </div>
        <div className="container">
           <TreeMap
      id="myTreeMap"
      bgColorRangeLow={"#6a9abd"} bgColorRangeHigh={"#aad8fa"}
      height={window.innerHeight - 100}
      width={window.innerWidth - 100}
      data={data}
      valueUnit=""
  />
        </div>
      </div>
    );
  }
}
