import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Items from "./components/Items/Items";
import Admin from "./components/Admin/Admin";
import Update from "./components/Admin/Update";
import About from "./components/About/About";
import Login from "./components/Admin/Auth";
import { AuthContext } from "../src/components/context/auth-context";
import { useAuth } from "../src/components/Hooks/auth-hook";
import Checkout from "./components/checkout/Checkout";
import HomeNotes from "./components/Home/Home";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  if (token) {
    routes = (
      // Logged in
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/update/:_id">
          <Update />
        </Route>
        <Redirect to="/admin" />
        <Route component={Items} path="/:itemId" />
      </Switch>
    );
  } else {
    routes = (
      // User
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route component={Items} path="/:itemId" />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
