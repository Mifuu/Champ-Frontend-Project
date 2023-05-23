import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { UpdateUser as UpdateUserType, User } from "typing";

export default function Settings() {
  const [email,setEmail] = useState(localStorage.getItem("email") as string);
  const [username,setUsername] = useState(localStorage.getItem("username") as string);
  const [bio,setBio] = useState(localStorage.getItem("bio") as string);
  const [image,setImage] = useState(localStorage.getItem("image") as string);

  const history = useHistory();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const msgBody = 
        `{
          "user": {
            "email": "${email}",
            "token": "${localStorage.getItem("authToken")}",
            "username": "${username}",
            "bio": "${bio}",
            "image": "${image}"
          }
        }`;

      console.log(msgBody);
      const response = await fetch("http://localhost:3000/api/user", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
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
  
        //history.push('/');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleLogout = () => {
    localStorage.clear();

    history.push('/');
  }

  return (
    <>

      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="URL of profile picture"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input 
                      className="form-control form-control-lg" 
                      type="text" 
                      placeholder="Your Name" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea 
                      className="form-control form-control-lg" 
                      rows={8} 
                      placeholder="Short bio about you" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input 
                      className="form-control form-control-lg" 
                      type="text" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit">Update Settings</button>
                </fieldset>
              </form>
              <hr />
              <a className="btn btn-outline-danger" onClick={handleLogout}>
                Or click here to logout.
              </a>
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
