import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Items from "./components/Items/Items";
import Admin from "./components/Admin/Admin";
import Update from "./components/Admin/Update";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/update/:_id">
            <Update />
          </Route>
          <Route component={Items} path="/:itemId" />
          {/* <Route component={Update} path="/update/:_id" /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
