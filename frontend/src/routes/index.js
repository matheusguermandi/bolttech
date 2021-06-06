import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
