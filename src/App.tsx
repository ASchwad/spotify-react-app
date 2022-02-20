import axios from 'axios';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  React.useEffect(() => {
    // Check if there is a token in local storage
    if (
      localStorage.getItem('token_timestamp') &&
      typeof localStorage.getItem('token_timestamp') == 'string' &&
     new Date(localStorage.getItem('token_timestamp')!).valueOf() > (Date.now() - 1000 * 60 * 60)) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
     } else if (window.location.href.includes('access_token')){
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
