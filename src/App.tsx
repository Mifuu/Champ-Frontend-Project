import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "NavBar";
import { useState, useEffect } from "react";

import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./LoginRegister";
import Logout from "./Logout";
import Profile from "./Profile";
import Settings from "./Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn}/>
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route 
          path="/login" 
          exact 
          render={(props) => (
            <LoginRegister {...props} handleLogin={handleLogin} />
          )}
        />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={LoginRegister} />
        <Route 
          path="/settings" 
          exact 
          render={(props) => (
            <Settings {...props} handleLogout={handleLogout} />
          )}
        />
        <Route path="/:slug" exact component={Article} />
        <Route path="/" component={ArticleList} />
      </Switch>
    </Router>
  );
}

export default App;
