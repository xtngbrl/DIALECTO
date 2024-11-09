import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './AdminHeader';
import Admin_Footer from './AdminFooter';
import './admin.css';

const AdminHomePage = () => {
  const navigate = useNavigate();

  const [progressBars, setProgressBars] = useState([]);
  const [dialectName, setDialectName] = useState('');
  const [progress, setProgress] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const addProgress = (e) => {
    e.preventDefault();

    if (!dialectName) {
      alert('Please enter a dialect name.');
      return;
    }

    const newProgressBar = {
      name: dialectName,
      progress: progress
    };

    setProgressBars([...progressBars, newProgressBar]);
    setDialectName('');
    setProgress(); 
  };

  const handleProgressChange = (index, newValue) => {
    const updatedProgressBars = progressBars.map((bar, i) => 
      i === index ? { ...bar, progress: newValue } : bar
    );
    setProgressBars(updatedProgressBars);
  };


  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`admin-home-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Admin_Header onClick={handleHamburgerClick} />
      
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
          <li onClick={() => navigate('/dialecto/admin-dashboard')}>Home</li>
          <li onClick={() => navigate('/dialecto/admin-user')}>Users</li>
          <li onClick={() => navigate('')}>Settings</li>
          <li onClick={() => navigate('')}>Reports</li>
          <li onClick={() => navigate('/dialecto/sign-in')}>Logout</li>
        </ul>
      </div>

      <div className='admin-content'>
        <h1>Welcome, Admin</h1>
        <h5>Here's a summary of your dashboard</h5>

        <div className='admin-card-container'>
          <div className='admin-cards'>
            <h3>Total Users</h3>
            <p>120</p>
          </div>
          <div className='admin-cards'>
            <h3>New Users</h3>
            <p>45</p>
          </div>
          <div className='admin-cards'>
            <h3>Average Users</h3>
            <p>98</p>
          </div>
        </div>

        <h4>Progress by Dialect</h4>
        <div className='admin-progress-form'>
          <form onSubmit={addProgress}>
            <input 
              type="text" 
              placeholder='Dialect Name' 
              value={dialectName} 
              onChange={(e) => setDialectName(e.target.value)} 
              required
            />
            <input 
              type="number" 
              placeholder='%' 
              value={progress} 
              onChange={(e) => setProgress(Number(e.target.value))} 
              min='0' 
              max='100' 
              required
            />
            <button type="submit">Add Progress</button>
          </form>
        </div>

        <div id="progress-container">
          {progressBars.map((bar, index) => (
            <div key={index} className='progress-bar'>
              <label>{bar.name}</label>
              <div className='progress'>
                <div className='progress-fill' style={{ width: `${bar.progress}%` }}>
                  {bar.progress}%
                </div>
              </div>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={bar.progress} 
                onChange={(e) => handleProgressChange(index, Number(e.target.value))} 
              />
            </div>
          ))}
        </div>
      </div>

      <Admin_Footer />
    </div>
  );
};

export default AdminHomePage;
