import React from 'react';
import AdminHeader from './AdminHeader.jsx';
import { Card, Button, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './admin.css';

const sampleGames = [
  { id: 1, name: 'Word Shooter', type: 'Vocabulary', status: 'Active' },
  { id: 2, name: 'Guess the Word', type: 'Quiz', status: 'Inactive' },
  { id: 3, name: 'Quiz Quest', type: 'Quiz', status: 'Active' },
  { id: 4, name: 'Voice Match', type: 'Audio', status: 'Active' },
  { id: 5, name: 'Letter Hunt', type: 'Vocabulary', status: 'Inactive' },
  { id: 6, name: 'Jumble Fix', type: 'Vocabulary', status: 'Active' },
];

const columns = [
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Type', selector: row => row.type, sortable: true },
  { name: 'Status', cell: row => (
      <span className={`badge ${row.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{row.status}</span>
    ), sortable: true },
  // { name: 'Actions', cell: row => (
  //     <>
  //       <Button size="sm" variant="warning" className="me-2">Edit</Button>
  //       <Button size="sm" variant="danger">Delete</Button>
  //     </>
  //   ),
  //   ignoreRowClick: true,
  //   allowOverflow: true,
  //   button: true
  // },
];

const handleRowClicked = row => {
  alert(`Game: ${row.name}\nType: ${row.type}\nStatus: ${row.status}`);
};

const AdminGames = () => {
  return (
    <>
      <AdminHeader />
      <div className="admin-content">
        {/* <h4>Game Management Page</h4> */}
        {/* <Row className="mb-4">
          <Col md={4}>
            <Card className="admin-cards">
              <Card.Body>
                <Card.Title>Total Games</Card.Title>
                <h3 className="text-primary">{sampleGames.length}</h3>
                <Card.Text>Manage all games in the system.</Card.Text>
                <Button variant="primary">Add New Game</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Game List</Card.Title>
            <DataTable
              columns={columns}
              data={sampleGames}
              highlightOnHover
              pointerOnHover
              onRowClicked={handleRowClicked}
              pagination
              striped
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AdminGames;
