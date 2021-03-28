import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SelectImages from "../SelectImages";
import ArrangeImages from "../ArrangeImages";

export default function Routes() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>

            <li>
              <Link to="/sort">Arrange Images</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <SelectImages />
          </Route>
          <Route exact path="/arrange-images">
            <ArrangeImages />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
