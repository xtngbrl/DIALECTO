import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin_Header from './AdminHeader';
import { Table, Button, Modal, Form, Row, Pagination } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Papa from 'papaparse'; 
import './admin.css';
import { FaFilter } from "react-icons/fa";
import { TbCsv } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";


const AdminUserPage = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Change this number to control items per page

  const users = [
    { id: 1, name: "Student A", email: "john.doe@example.com", progress: 75, lastActivity: "2025-03-04" },
    { id: 2, name: "Student B", email: "jane.smith@example.com", progress: 50, lastActivity: "2025-03-03" },
    { id: 3, name: "Student C", email: "alice.johnson@example.com", progress: 90, lastActivity: "2025-03-02" },
    { id: 4, name: "Student D", email: "bob.miller@example.com", progress: 65, lastActivity: "2025-03-01" },
    { id: 5, name: "Student E", email: "emily.davis@example.com", progress: 40, lastActivity: "2025-02-28" }
  ];

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowOffcanvas(true);
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    console.log("New User Added:", newUser);
    setShowModal(false);
  };

  const exportToCSV = () => {
    const csvData = users.map(user => ({
      Name: user.name,
      Email: user.email,
      Progress: `${user.progress}%`,
      "Last Activity": user.lastActivity
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div>
      <Row className="m-0 mb-5">
        <Admin_Header />
      </Row>
      <div className='admin-table-container pt-5 m-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className="mr-auto">Student List</h2>
          <div>
          <Button variant='secondary' className="me-2"> <FaFilter/> </Button>
            <Button variant='success' className="me-2" onClick={exportToCSV}> <TbCsv size={24}/> </Button>
            <Button variant='primary' onClick={handleModalShow}> <IoMdAdd size={20}/> </Button>
          </div>
        </div>
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
            {currentItems.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><ProgressBar now={user.progress}/></td>
                <td>{user.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="justify-content-center">
          <Pagination.Prev 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1} 
          />
          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item 
              key={number + 1} 
              active={number + 1 === currentPage} 
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages} 
          />
        </Pagination>
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
              <p><strong>Progress:</strong> <ProgressBar now={selectedUser.progress} /></p>
              <p><strong>Last Activity:</strong> {selectedUser.lastActivity}</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' value={newUser.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' value={newUser.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' value={newUser.password} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>Close</Button>
          <Button variant='primary' onClick={handleAddUser}>Add Student</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUserPage;
