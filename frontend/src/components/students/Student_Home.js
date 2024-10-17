import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../style/HomeOffice.css'; 

const HomeTeacher = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };
  

  

  return (
    <div className="home-office">
      <h2>Welcome to the student Home Page</h2>
      {name && <p>Hello, {name}!</p>}
      <nav className="navbar">
        <Link to='/updatestu'>Update</Link>
       <Link to='/viewteacher'>View teacher</Link>
       <Link to='/viewstudymaterial'>View Study material</Link>
       <Link to='/examnot'>View notification</Link>
       <Link to='/stuviewque'>View Questions</Link>
       <Link to='/stuviewnot'>View Fees Notification</Link>
       <Link to='/timetable'>View time table</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default HomeTeacher;
