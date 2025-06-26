import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import AdminHeader from './AdminHeader.jsx';
import { Button, Modal, Form, Pagination, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Papa from 'papaparse'; 
import './admin.css';
import { FaFilter } from "react-icons/fa";
import { TbCsv } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";

const AdminUserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', username: '', password: '', role_name: 'Student' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowOffcanvas(true);
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await axiosInstance.post('/addUser', newUser);
      setUsers([...users, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      <AdminHeader />
      <div className="admin-content">
        <Card className="shadow-sm">
        <Card.Body>
        <div className='admin-table-container'>
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className="mr-auto">Student List</h2>
            <div>
              <Button variant='secondary' className="me-2"> <FaFilter/> </Button>
              <Button variant='success' className="me-2" onClick={exportToCSV}> <TbCsv size={24}/> </Button>
              <Button variant='primary' onClick={handleModalShow}> <IoMdAdd size={20}/> </Button>
            </div>
          </div>

          <DataTable
            columns={[
              { name: 'Name', selector: row => `${row.first_name} ${row.last_name}`, sortable: true },
              { name: 'Email', selector: row => row.email, sortable: true },
              { name: 'Progress', cell: row => <ProgressBar now={row.progress} />, sortable: true },
              { name: 'Last Activity', selector: row => row.lastActivity || 'Not available', sortable: true },
            ]}
            data={currentItems}
            highlightOnHover
            pointerOnHover
            onRowClicked={handleRowClick}
            pagination
            striped
            />
        </div>
          </Card.Body>
        </Card>

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
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' name='first_name' value={newUser.first_name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' name='last_name' value={newUser.last_name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' name='username' value={newUser.username} onChange={handleInputChange} />
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
    </>
  );
};

export default AdminUserPage;
