import React from 'react';
import { generateAuthURL } from 'api/spotify';
import logo from './logo.svg';
import './Login.css';

function Login() {
  return (
    <>
      <div className="LoginContainer">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="pb-6 md:pb-10">
            <div className="text-center pb-8 md:pb-10">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                Analyze and configure your favorite Spotify playlists
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600">Currently only supported for selected Spotify accounts.</p>
              </div>
            </div>
          </div>

          <button className="LoginButton pl-4 pr-4 mx-auto" type='submit' onClick={() => {window.location.href = generateAuthURL();}}>
            <p className='text-white text-lg pl-4'>
              Login with
            </p>
            <img className="h-24" src={logo} alt="logo" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
