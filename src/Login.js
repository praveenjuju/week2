import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="form-container">
      <h2>🔐 Login</h2>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username (admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password (1234)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
