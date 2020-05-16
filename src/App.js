import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FirstPage from "./containers/FirstPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./containers/SignUp";
import Cookies from "js-cookie";

const App = () => {
  // création de 2 états pour accéder à la valeur des cookies "token" et "username" et accéder à la valeur
  const [token, setToken] = useState(Cookies.get("token"));
  const [username, setUsername] = useState(Cookies.get("username"));

  // création de la const onLogin
  const onLogin = (token, username) => {
    // mise à jour des états - on appelle la fonction pour modifier la valeur
    setToken(token);
    setUsername(username);
    // enregistrement de la valeur du token et username et date d'expiration du cookie exprimée en jours
    Cookies.set("token", token, { expires: 2000 });
    Cookies.set("username", username, { expires: 2000 });
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} username={username} />
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/home">
          <PrivateRoute />
        </Route>
        <Route path="/login">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <SignUp onLogin={onLogin} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
export default App;
