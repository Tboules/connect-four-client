import React from "react";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import GameComp from "./components/GameComp/GameComp";
import Nav from "./components/Header/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useUser } from "./context/UserContext";
import Login from "./components/Login/SignIn";
import JoinOrCreate from "./components/JoinOrCreate";

function App() {
  const { userIn, gameId } = useUser();
  console.log(userIn);
  return (
    <div className="App">
      <Router>
        <Header>
          <h1 style={{ flex: "1", color: "#1750e1", fontSize: "2.3rem" }}>
            Connect 4
          </h1>
          <Nav />
        </Header>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route exact path="/join-or-create">
            {userIn ? <JoinOrCreate /> : <Redirect to="/" />}
          </Route>
          <Route exact path={`/${gameId}`}>
            {userIn && gameId ? <GameComp /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
