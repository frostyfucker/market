import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/upload">Upload Image</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/upload" element={<ImageUploader />} />
        <Route path="/" element={<div>Welcome to the App!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
