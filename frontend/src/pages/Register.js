import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

// Functional component for user registration
// This component allows users to create a new account by providing their email and password.
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/register', { email, password });
      setMsg('Registration successful! You can login now.');
    } catch {
      setMsg('Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-3" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4 text-primary">Create an Account</h3>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={handleRegister}>
          {/* Email input */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-group-text bg-light"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Register button */}
          <button className="btn btn-success w-100 py-2" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Login redirect */}
        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login" className="text-primary">Login here</a></small>
        </div>
      </div>
    </div>
  );
};

export default Register;

