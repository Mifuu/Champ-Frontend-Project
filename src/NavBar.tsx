import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [currentID, setCurrentID] = useState(0);

  if (localStorage.getItem("authToken") !== undefined) {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a 
                className={currentID == 0 ? "nav-link active" : "nav-link"}
                href="/#"
                onClick={() => {setCurrentID(0)}}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={currentID == 1 ? "nav-link active" : "nav-link"}
                href="/#/editor"
                onClick={() => {setCurrentID(1)}}
              >
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={currentID == 2 ? "nav-link active" : "nav-link"}
                href="/#/settings"
                onClick={() => {setCurrentID(2)}}
              >
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={currentID == 3 ? "nav-link active" : "nav-link"}
                href={"/#/profile/" + localStorage.getItem("username")}
                onClick={() => {setCurrentID(3)}}
              >
                <i className="ion-happy-outline" />
                &nbsp;Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a 
              className={currentID == 0 ? "nav-link active" : "nav-link"}
              href="/#"
              onClick={() => {setCurrentID(0)}}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={currentID == 3 ? "nav-link active" : "nav-link"}
              href="/#/login"
              onClick={() => {setCurrentID(3)}}
            >
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={currentID == 4 ? "nav-link active" : "nav-link"}
              href="/#/register"
              onClick={() => {setCurrentID(4)}}
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;