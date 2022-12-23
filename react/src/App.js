import "./App.css";
import React, { Suspense } from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./config/api/history";
import "./css/styles.css";

const loading = () => <div>Loading....</div>;

const Dashboard = React.lazy(() => import("./views/Dashboard"));

function App() {
  return (
    <Suspense fallback={loading()}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/dashboard"
            name="Dashboard"
            component={Dashboard}
          />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
