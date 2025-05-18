import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

// Login component for user authentication
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/login', { email, password });
      setMsg('Login successful!');
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } catch {
      setMsg('Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-3" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4 text-primary">Welcome Back!</h3>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
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

          {/* Login button */}
          <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Register redirect */}
        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register" className="text-primary">Register here</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;

