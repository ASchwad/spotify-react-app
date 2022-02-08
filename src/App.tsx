import axios from 'axios';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  React.useEffect(() => {
    if (!localStorage.getItem('token') && window.location.href.includes('access_token')) {
        const token = window.location.href
        .split('access_token=')[1]
        .split('&token_type')[0];
        localStorage.setItem('token', token);
        if (token !== undefined) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
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
