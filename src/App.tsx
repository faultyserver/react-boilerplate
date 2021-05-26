import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MapViewer from "./modules/maps/MapViewer";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <MapViewer />
        </Route>
      </Switch>
    </Router>
  );
}
