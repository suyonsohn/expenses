import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
