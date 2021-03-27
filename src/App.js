import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Sort from "./Sort";
import ImageSelection from "./ImageSelection";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Select</Link>
            </li>
            <li>
              <Link to="/photogrid">Photo Grid</Link>
            </li>
            <li>
              <Link to="/sort">Sort</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route ecact path="/photogrid">
            <About />
          </Route>*/}
          <Route exact path="/">
            <ImageSelection />
          </Route>{" "}
          <Route exact path="/sort">
            <Sort />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
