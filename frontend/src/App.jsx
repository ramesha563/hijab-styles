// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StyleDetail from './pages/StyleDetail';

        import HijabDetail from './pages/HijabDetail';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';

function App() {
  const [userName, setUserName] = useState(null);

  // Load user on refresh (from token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.username || decoded.email);
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <>
      <Navbar userName={userName} setUserName={setUserName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/signup" element={<Signup setUserName={setUserName} />} />
        <Route path="/style/:id" element={<StyleDetail />} />


<Route path="/hijab/:id" element={<HijabDetail />} />

      </Routes>
    </>
  );
}

export default App;
