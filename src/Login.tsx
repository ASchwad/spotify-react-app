import React from 'react';
import logo from './logo.svg';
import './App.css';

function generateRandomString(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function generateAuthURL() {
  const client_id = 'fba3cb47d4d14044aeae581cd5be33a1'; // Your client id
  const redirect_uri = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://aschwad.github.io/spotify-react-app/'}dashboard`; // Your redirect uri
  console.log(`REDIRECT URI: ${  redirect_uri}`);
  const state = generateRandomString(16);

  // localStorage.setItem(stateKey, state);
  const scope = 'user-read-private user-read-email';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += `&client_id=${encodeURIComponent(client_id)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  url += `&state=${encodeURIComponent(state)}`;
  return url;
}

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href={generateAuthURL()} className="text-lg font-light line">
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;
