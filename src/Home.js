

/*function Home() {
  return (
    <>
      <h2>🌍 Global Theme Switcher</h2>
      <div className="floating-label">
        <input type="text" id="name" placeholder=" " />
        <label htmlFor="name">Your Name</label>
      </div>
      <div className="floating-label">
        <input type="email" id="email" placeholder=" " />
        <label htmlFor="email">Your Email</label>
      </div>
      <button>Submit</button>
    </>
  );
}

export default Home;*/
//task 3
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const isValidName = (str) => /^[A-Za-z.\s]+$/.test(str);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidName(name)) {
      toast.error('❌ Full Name can contain only letters, spaces, and periods.');
      return;
    }

    const newEntry = { name, email };

    let stored = [];
    try {
      const raw = localStorage.getItem('formData');
      const parsed = JSON.parse(raw);
      stored = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      stored = [];
    }

    stored.push(newEntry);
    localStorage.setItem('formData', JSON.stringify(stored));
    setSubmittedData(newEntry);
    toast.success('Form submitted!');
    setName('');
    setEmail('');
  };

  const handleClear = () => {
    localStorage.removeItem('formData');
    toast.info('All submissions cleared!');
    setSubmittedData(null);
  };

  const allData = JSON.parse(localStorage.getItem('formData')) || [];

  return (
    <>
      <h2>🌍 Global Theme Switcher</h2>

      <form onSubmit={handleSubmit}>
        <div className="floating-label">
          <input
            type="text"
            id="name"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Full Name</label>
        </div>

        <div className="floating-label">
          <input
            type="email"
            id="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            marginLeft: '10px',
            background: 'gray',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          🧹 Clear All
        </button>
      </form>

      {submittedData && (
        <div className="output-box">
          <h3>✅ Last Submitted:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>

          <h4>📦 All Submissions:</h4>
          <ul>
            {allData.map((item, idx) => (
              <li key={idx}>
                {item.name} – {item.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Home;

4
4

44