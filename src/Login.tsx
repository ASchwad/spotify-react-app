import React from 'react';
import { generateAuthURL } from 'api/spotify';
import logo from './logo.svg';
import './Login.css';

function Login() {
  return (
    <div className="LoginContainer">
      <div>
        <p className="Lyza">
          LYZA
        </p>
        <p className='LyzaSubtitle'>
          Analyze and configure your favorite Spotify Playlists
        </p>
      </div>
      <button className="LoginButton pl-4 pr-4" type='submit' onClick={() => {window.location.href = generateAuthURL();}}>
        <p className='text-white text-lg pl-4'>
          Login with
        </p>
        <img src={logo} className="Spotify-logo" alt="logo" />
      </button>
    </div>
  );
}

export default Login;
