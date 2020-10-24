import React, { Component } from "react";
import Context from "../Context";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Slider, Button } from "antd";
import "../App.css";

import { SliderPicker } from "react-color";
import Redirect from "react-router-dom/Redirect";

import graph from "./graph.png";
import avg from "./avg.jpeg";
import cones from "./cones.png";
import rgb from "./rgb.png";

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
        <div className="container">
          {this.state.page < 18 ? (
            <div>
              <div className="header">
                <div className="header-text">Color Test</div>
              </div>
              <div className="color-test">
                <div
                  style={{
                    background: `hsl(${this.state.hue},100%,50%)`,
                    width: 200,
                    height: 200,
                  }}
                />
                <div
                  style={{
                    background: `hsl(${
                      this.state.tests[this.state.page].hue
                    },100%,50%)`,
                    width: 200,
                    height: 200,
                    marginLeft: 20,
                  }}
                />

                <SliderPicker
                  color={this.state.color}
                  onChangeComplete={this.handleChangeComplete}
                />

                <Button
                  className="confirm"
                  type="primary"
                  onClick={this.nextColor}
                >
                  Confirm
                </Button>

                <div className="proggress">{this.state.page} / 18</div>
                <div className="explain">
                  Drag and drop the slider to change the color of the left
                  square, and try to match it best to the color on the right!{" "}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="header">
                <div className="header-text">Results</div>
              </div>
              <div className="color-test">
                <div className="graph-container">
                  {this.state.tests.map((test) => (
                    <div
                      style={{
                        background: `hsl(${test.hue},100%,50%)`,
                        width: 20,
                        height:
                          800 * (1 - Math.abs(test.hue - test.guess) / 360) -
                          400,
                        position: "absolute",
                        right: test.hue,
                        bottom: 0,
                      }}
                    />
                  ))}
                  <img src={graph} className="scale" />
                </div>
                <div className="rest">
                  <div className="compare">
                    Compare your results to the average!
                  </div>
                  <img src={avg} className="avg" />
                  <div className="compare">Why does this occur?</div>
                  <img src={cones} className="cones" />
                  <div className="para">
                    The human eye is made up out of rods and cones behind the
                    lens. Rods are the cells that determine brightness while
                    cones are used to determine the color of the light. Our eyes
                    combine the signals coming from many of these cells to
                    process color and light.
                  </div>
                  <img src={rgb} className="rgb" />
                  <div className="para">
                    There are three types of cones in the eye for processing
                    red, blue, and green light. Here you can see what
                    wavelengths of light activate each cone. At 525nm, we see
                    each cone will get activated and send a signal to the brain,
                    so how will it determine the color? The brain uses the ratio
                    of signals sent from each cone to get the color, but some of
                    these colors send more data than others. You'll notice there
                    is a large overlap between the red and green cones. This
                    means that the brain is extra sensitive towards changes in
                    color around 600nm since there is such a large overlap. This
                    has been speculated to be used in early humans for
                    determining ripeness of fruit and vegetables.
                  </div>
                  <div className="sources">Cited Sources</div>
                  <div className="sources">
                    “Research Collective Blog - Designing the Stop Sign.”
                    Research Collective, 22 Feb. 2019,
                    research-collective.com/blog/human-factors-history-designing-stop-sign/.
                  </div>
                  <div className="sources">
                    Kazilek. “Rods and Cones.” Kazilek, 6 Jan. 2010,
                    askabiologist.asu.edu/rods-and-cones.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
