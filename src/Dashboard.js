import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
    setDarkMode(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.info('Logged out!');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>📊 Dashboard</h2>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <p>Welcome, you're logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
