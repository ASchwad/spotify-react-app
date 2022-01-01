
import React from 'react';
import logo from './logo.svg';
import './App.css';

function generateRandomString(length: number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function generateAuthURL(){
  var client_id = 'fba3cb47d4d14044aeae581cd5be33a1'; // Your client id
  var redirect_uri = 'http://localhost:3000/dashboard'; // Your redirect uri

  var state = generateRandomString(16);

  // localStorage.setItem(stateKey, state);
  var scope = 'user-read-private user-read-email';

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);
  return url
}

function Login() { 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1> */}
        <a href={generateAuthURL()} className="text-lg font-light line">Login with Spotify</a>
      </header>
    </div>
  );
}

export default Login;
