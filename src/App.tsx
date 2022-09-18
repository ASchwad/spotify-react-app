import axios from 'axios';
import Dashboard from 'components/Dashboard/Dashboard';
import Login from 'components/Login/Login';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  React.useEffect(() => {
    axios.defaults.baseURL = 'https://api.spotify.com/v1';
    // Check if there is a token in local storage and token_timestamp is valid
    if (
      localStorage.getItem('token_timestamp') &&
      typeof localStorage.getItem('token_timestamp') == 'string' &&
     new Date(localStorage.getItem('token_timestamp')!).valueOf() > (Date.now() - 1000 * 60 * 60)) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
     } else if (window.location.href.includes('access_token')){
         // If the user has logged in, he will be redirected to the app with the access token in the url
         // e.g. https://aschwad.github.io/spotify-react-app/dashboard#access_token=BQCNkJDLC64bgG7spk9tyT6KHr2VKRTvCMGPfonXmU-YReRXnolvsw2L58iBYPY77A8t4SE-mfmqTseGDdF_tnUaxSWOfutjA22UMGiM7mozaPCc9QG0KKNayFgBgGchjGORnFaPBoDmx32-lTjrhXUdWgU3ql5QxXoI4juzIeKFc9iJ0ZGyuq6cCljbTu7-Zemfz0xiEcpMLBtBm4k&token_type=Bearer&expires_in=3600&state=3PwlJjXQVx4zqOPU
         const token = window.location.href
         .split('access_token=')[1]
         .split('&token_type')[0];
         localStorage.setItem('token', token);
         localStorage.setItem('token_timestamp', (new Date()).toString());
         if (token !== undefined) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
