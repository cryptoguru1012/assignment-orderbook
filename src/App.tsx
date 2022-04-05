import React from "react";
import { Route, Switch } from "react-router-dom";

import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        {Routes.map((route: any) => (
          <Route exact path={route.path} key={route.path}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default App;
