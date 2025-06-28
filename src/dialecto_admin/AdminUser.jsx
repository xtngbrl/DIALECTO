import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import AdminHeader from './AdminHeader.jsx';
import { Button, Modal, Form, Pagination, Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as ExcelJS from 'exceljs';
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

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      // Filter users where at least one role has role_name "Student"
      const filteredUsers = response.data.filter(user =>
        user.roles && user.roles.some(role => role.role_name === "Student")
      ).map(student => ({
        ...student,
        lastActive: student.user_activities && student.user_activities[0]?.last_login
          ? new Date(student.user_activities[0].last_login).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
          : 'N/A',
           progress: student.user_progresses && student.user_progresses[0]?.dialect_progress !== undefined
          ? student.user_progresses[0].dialect_progress
          : 0
      }));
      setUsers(filteredUsers);
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

  const exportToExcel = async () => {
    // Calculate statistics
    const totalStudents = users.length;
    const averageProgress = users.reduce((sum, user) => sum + user.progress, 0) / totalStudents;
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students Report', {
      pageSetup: { 
        paperSize: 9, 
        orientation: 'landscape',
        margins: {
          left: 0.7, right: 0.7,
          top: 0.75, bottom: 0.75,
          header: 0.3, footer: 0.3
        }
      }
    });

    // Set column widths and headers
    worksheet.columns = [
      { header: 'Full Name', key: 'name', width: 28 },
      { header: 'Email Address', key: 'email', width: 38 },
      { header: 'Progress (%)', key: 'progress', width: 18 },
      { header: 'Last Activity', key: 'lastActivity', width: 28 }
    ];

    // Style the header row (row 1)
    const headerRow = worksheet.getRow(1);
    headerRow.height = 24;
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFECF0F1' }
      };
      cell.font = {
        bold: true,
        size: 12,
        color: { argb: 'FF2C3E50' }
      };
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF666666' } },
        left: { style: 'thin', color: { argb: 'FF666666' } },
        bottom: { style: 'thin', color: { argb: 'FF666666' } },
        right: { style: 'thin', color: { argb: 'FF666666' } }
      };
    });

    // Add data rows with professional styling
    users.forEach((user, index) => {
      const row = worksheet.addRow({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        progress: user.progress, // Store as number for better formatting
        lastActivity: user.lastActive
      });
      
      // Set row height for better spacing
      row.height = 22;
      
      // Style data cells
      row.eachCell((cell, colNumber) => {
        // Alternating row colors for better readability
        const bgColor = index % 2 === 0 ? 'FFFFFFFF' : 'FFF8F9FA';
        
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor }
        };
        
        cell.font = {
          size: 11,
          color: { argb: 'FF2C3E50' }
        };
        
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
          right: { style: 'thin', color: { argb: 'FFE0E0E0' } }
        };

        // Column-specific styling
        if (colNumber === 1) { // Name column
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
          cell.font = { ...cell.font, bold: true };
        } else if (colNumber === 2) { // Email column
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
        } else if (colNumber === 3) { // Progress column
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.numFmt = '0"%"'; // Format as percentage
          
          // Color coding for progress
          if (user.progress >= 80) {
            cell.font = { ...cell.font, color: { argb: 'FF27AE60' }, bold: true };
          } else if (user.progress >= 60) {
            cell.font = { ...cell.font, color: { argb: 'FFF39C12' }, bold: true };
          } else {
            cell.font = { ...cell.font, color: { argb: 'FFE74C3C' }, bold: true };
          }
        } else if (colNumber === 4) { // Last Activity column
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      });
    });

    // Add spacing before footer
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Add footer section
    const footerRowIndex = users.length + 4; // Account for header and spacing rows
    
    // Summary statistics section
    const summaryRow = worksheet.addRow(['REPORT SUMMARY']);
    worksheet.mergeCells(`A${footerRowIndex}:D${footerRowIndex}`);
    const summaryCell = worksheet.getCell(`A${footerRowIndex}`);
    summaryCell.font = {
      bold: true,
      size: 14,
      color: { argb: 'FF34495E' }
    };
    summaryCell.alignment = {
      horizontal: 'center',
      vertical: 'middle'
    };
    summaryCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFECF0F1' }
    };
    summaryCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    summaryRow.height = 25;

    // Add detailed statistics
    const statsRowIndex = footerRowIndex + 1;
    const statsText = `Total Students: ${totalStudents}  •  Average Progress: ${averageProgress.toFixed(1)}%  •  Report Generated: ${currentDate}`;
    
    worksheet.mergeCells(`A${statsRowIndex}:D${statsRowIndex}`);
    const statsCell = worksheet.getCell(`A${statsRowIndex}`);
    statsCell.value = statsText;
    statsCell.font = {
      bold: true,
      size: 11,
      color: { argb: 'FF5D6D7E' }
    };
    statsCell.alignment = {
      horizontal: 'center',
      vertical: 'middle'
    };
    statsCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8F9FA' }
    };
    statsCell.border = {
      top: { style: 'thin', color: { argb: 'FFB85D1D' } },
      left: { style: 'thin', color: { argb: 'FFB85D1D' } },
      bottom: { style: 'thin', color: { argb: 'FFB85D1D' } },
      right: { style: 'thin', color: { argb: 'FFB85D1D' } }
    };
    worksheet.getRow(statsRowIndex).height = 20;

    // Freeze the header row (row 1)
    worksheet.views = [
      { state: 'frozen', ySplit: 1 }
    ];

    // Generate and download file
    const fileName = `Students_Progress_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
              <Button variant='success' className="me-2" onClick={exportToExcel}> Generate Report </Button>
              <Button variant='primary' onClick={handleModalShow}> <IoMdAdd size={20}/> </Button>
            </div>
          </div>

          <DataTable
            columns={[
              { name: 'Name', selector: row => `${row.first_name} ${row.last_name}`, sortable: true },
              { name: 'Email', selector: row => row.email, sortable: true },
              { name: 'Progress', cell: row => <ProgressBar now={row.progress} />, sortable: true },
              { name: 'Last Activity', selector: row => row.lastActive || 'Not available', sortable: true },
            ]}
            data={users}
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
                <p><strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Progress:</strong> <ProgressBar now={selectedUser.progress} /></p>
                <p><strong>Last Activity:</strong> {selectedUser.lastActive}</p>
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