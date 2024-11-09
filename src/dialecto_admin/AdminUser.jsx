import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './AdminHeader';
import Admin_Footer from './AdminFooter';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaFileExport } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import './admin.css';

const AdminUserPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: '', username: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleActionClick = (name, username) => {
    setModalData({ name, username });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sample data
  const data = [
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'janesmith@example.com' },
    { id: 3, name: 'Michael Johnson', username: 'michaelj', email: 'michaelj@example.com' },
    { id: 4, name: 'Amiel Santillano', username: 'amielsanti', email: 'amielsantillano@example.com' },
    { id: 5, name: 'Joe Biden', username: 'joepres', email: 'joebiden@example.com' },
  ];

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={`admin-home-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Admin_Header onClick={handleHamburgerClick} />
      
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => navigate('/dialecto/admin-dashboard')}>Home</li>
          <li onClick={() => navigate('/users')}>Users</li>
          <li onClick={() => navigate('')}>Settings</li>
          <li onClick={() => navigate('')}>Reports</li>
          <li onClick={() => navigate('/dialecto/sign-in')}>Logout</li>
        </ul>
      </div>

      <div className='admin-content'>
        <h1>User List</h1>
        <div className='admin-bar'>
          <div className='admin-search-bar'>
            <div className='admin-dropdown-btn'>
              <button className='dp-btn'>
                <span>All Users</span>
                <IoMdArrowDropdown />
              </button>
              <div className='dp-btn-content'>
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
              </div>
            </div>
            <div className="admin-search-container">
              <form action="/search" method="get">
                <input type="text" name="query" placeholder="Search..." required />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
          <button className='export-btn'>
            <FaFileExport />
            <span>Export</span>
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th
                  className="sortable"
                  onClick={() => handleSort('name')}
                >
                  Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
                </th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleActionClick(user.name, user.username)}>
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-body">
            <div className="modal-header">
              <h3>User Details</h3>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-content">
              <div className="content1 cont">
                <IoPerson />
                <h5 id="modalName">{modalData.name}</h5>
              </div>
              <div className="content2 cont">
                <h5>Username:</h5>
                <p id="modalUsername">{modalData.username}</p>
              </div>
              <div className="content3 cont">
                <h5>Dialect:</h5>
                <p>Waray</p>
              </div>
              <div className="content4 cont">
                <h5>Category:</h5>
                <p>Animal</p>
              </div>
              <div className="content5 cont">
                <h5>Progress:</h5>
                <p>88%</p>
              </div>
              <h6>Date last submitted answer: 08/31/2024</h6>
            </div>
          </div>
        </div>
      )}

      <Admin_Footer />
    </div>
  );
};

export default AdminUserPage;
