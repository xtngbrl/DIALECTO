import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './AdminHeader';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaFileExport } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Table, Row, Modal, Form } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './admin.css';

const AdminUserPage = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", progress: 75, lastActivity: "2025-03-04" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", progress: 50, lastActivity: "2025-03-03" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", progress: 90, lastActivity: "2025-03-02" }
  ];

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowOffcanvas(true);
  };

  const handleClose = () => setShowOffcanvas(false);

  return (
    <div>
      <Row className="mb-5">
        <Admin_Header />
      </Row>
      <div className='admin-table-container pt-5 p-5'>
        <h2>Student List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Progress</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><ProgressBar now={user.progress} label={`${user.progress}%`} /></td>
                <td>{user.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Progress:</strong> <ProgressBar now={selectedUser.progress} label={`${selectedUser.progress}%`} /></p>
              <p><strong>Last Activity:</strong> {selectedUser.lastActivity}</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AdminUserPage;
