import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Items from "./components/Items/Items";
import Admin from "./components/Admin/Admin";

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
          <Route component={Items} path="/:itemId" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
