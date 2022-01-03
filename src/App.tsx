import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
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
