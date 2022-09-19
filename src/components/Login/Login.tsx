import React from 'react';
import { generateAuthURL } from 'api/spotify';
import logo from './logo.svg';

function Login() {
  return (
    <>
      <div className="h-screen flex items-center bg-gradient-to-b from-purple-300 via-pink-300 to-indigo-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center pb-8 md:pb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
              Analyze and configure your favorite Spotify playlists
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">Currently only supported for selected Spotify accounts.</p>
          </div>

          <button className="bg-black rounded-md p-4 mx-auto  flex h-16 items-center" type='submit' onClick={() => {window.location.href = generateAuthURL();}}>
            <p className='text-white text-lg pl-4'>
              Login with
            </p>
            <img className="h-32" src={logo} alt="logo" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
