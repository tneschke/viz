import React from "react";
import { Route, Switch } from "react-router-dom";

import Colors from "./containers/Colors";

export default () => (
  <Switch>
    <Route path="/" exact component={Colors} />{" "}
  </Switch>
);
