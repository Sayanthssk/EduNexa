import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../style/HomeOffice.css'; 

const HomeOffice = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  

  return (
    <div className="home-office">
      <h2>Welcome to the Office Home Page</h2>
      {name && <p>Hello, {name}!</p>}
      <nav className="navbar">
        <Link to="/update">Update Profile</Link>
        <Link to="/view-teacher">View Teacher</Link>
        <Link to="/add-teacher">Add Teacher</Link>
        <Link to="/notification">Add Notification</Link>
        <Link to="/view-notifications">View Notification</Link>
        <Link to="/add-timetable">Add Timetable</Link>
        <Link to="/view-timetable">View Timetable</Link>
        <Link to="/view-students">View Students</Link>
        <Link to="/all-fee-notification">All Fee Notification</Link>
        <Link to="/add-syllabus">Add Syllabus</Link>
        <Link to='/view-syllabus'>View syllabus</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default HomeOffice;
