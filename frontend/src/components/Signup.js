import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../style/styles.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    registerNo:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', formData);
      alert(response.data.message);
      navigate('/'); 
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : 'An error occurred';
      alert(errorMsg);
    }
  };

  return (
    <div className="full-height section">
      <div className="overlay"></div>
      <div className="card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-style"
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-style"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-style"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-style"
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-style"
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-style"
              required
            />
          </div>
          {formData.role === 'student' && (
            <div>
              <label>Register No:</label>
              <input
                type="text"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                className="form-style"
                required
              />
            </div>
          )}
          <button type="submit" className="btn">Signup</button>
        </form>
        <p style={{ color: 'white' }}>
          if you have a account  <Link to="/" style={{ color: '#ffcc00' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
