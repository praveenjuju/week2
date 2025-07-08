//task 1
/*import React, { useState, useEffect } from 'react';
import './App.css';

const schema = {
  title: 'User Form',
  fields: [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Age', type: 'number', name: 'age' },
    { label: 'Gender', type: 'select', name: 'gender', options: ['Male', 'Female', 'Other'] },
    { label: 'Bio', type: 'textarea', name: 'bio' }
  ]
};

function App() {
  const [formData, setFormData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const localStorageKey = 'dynamicFormData';

  // ✅ Load form data from localStorage on app load
  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // ✅ Save to localStorage on form data change
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && !/^[a-zA-Z\s.]*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubscribe = () => {
    const name = formData.name || '';
    if (!name.trim()) {
      alert('Please enter your name before subscribing.');
      return;
    }
    setShowPopup(true);
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      onChange: handleChange,
      value: formData[field.name] || ''
    };

    return (
      <div className="floating-label">
        {field.type === 'textarea' ? (
          <textarea {...commonProps} required />
        ) : field.type === 'select' ? (
          <select {...commonProps} required>
            <option value="">-- Select --</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input type={field.type} {...commonProps} required />
        )}
        <label>{field.label}</label>
      </div>
    );
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className="form-container glass">
        <div className="header">
          <h2>{schema.title}</h2>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <form>
          {schema.fields.map((field, index) => (
            <div key={index} className="form-group">
              {renderField(field)}
            </div>
          ))}
        </form>

        <button onClick={handleSubscribe} className="subscribe-btn">Subscribe</button>

        <h3>Live Output</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      {showPopup && (
        <div className="modal-backdrop">
          <div className="modal glass">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h3>🎉 Thanks for Subscribing!</h3>
            <p>Your data is saved and you’re subscribed.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;*/

//task 2

/*import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;*/

//task 3

/*
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <div className="form-container">
          <ThemeToggle />
          <Home />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
*/

//task 4

/*
import FileUploader from './FileUploader';
import './index.css';

function App() {
  return (
    <div className="App">
      <FileUploader />
    </div>
  );
}

export default App;

*/

//task 5
/*import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selected, setSelected] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayed(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(maxPrice));
    }

    setDisplayed(filtered);
  }, [search, category, minPrice, maxPrice, products]);

  const categories = [...new Set(products.map((p) => p.category))];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === displayed.length) {
      setSelected([]);
    } else {
      setSelected(displayed.map((item) => item.id));
    }
  };

  const bulkDelete = () => {
    const updated = products.filter((p) => !selected.includes(p.id));
    setProducts(updated);
    setSelected([]);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header>
        <h2>🛍️ Product Dashboard</h2>
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
          <span className="slider round"></span>
        </label>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={bulkDelete} disabled={selected.length === 0}>
          🗑️ Delete Selected
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={selected.length === displayed.length && displayed.length > 0}
              />
            </th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
              </td>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>
                <img src={item.image} alt={item.title} height="40" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;


*/



