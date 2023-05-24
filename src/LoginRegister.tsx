import { useState } from "react";
import { useHistory } from 'react-router-dom';

import { User } from "typing";

export default function LoginRegister(onLoggedIn: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const msgBody = 
        `{
          "user": {
            "email": "${email}",
            "password": "${password}"
          }
        }`;

      console.log(msgBody);
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: msgBody
      });

      if (response.ok) {
        const data = await response.json();
        const item = data.user as User;
        const authToken = item.token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('email', item.email);
        localStorage.setItem('username', item.username);
        localStorage.setItem('bio', item.bio);
        localStorage.setItem('image', item.image);
  
        history.push('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>

      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="">Need an account?</a>
              </p>

              {/*}
              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>
              {*/}

              <form onSubmit={handleSubmit}>
                {/*}
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name" />
                </fieldset>
                {*/}
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
