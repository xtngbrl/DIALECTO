import React from 'react';
import AdminHeader from './AdminHeader.jsx';
import { Card, Button, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './admin.css';

const sampleDialects = [
  { id: 1, name: 'Yoruba', region: 'Southwest', speakers: 20000000 },
  { id: 2, name: 'Igbo', region: 'Southeast', speakers: 18000000 },
  { id: 3, name: 'Hausa', region: 'North', speakers: 25000000 },
];

const columns = [
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Region', selector: row => row.region, sortable: true },
  { name: 'Speakers', selector: row => row.speakers.toLocaleString(), sortable: true },
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
  alert(`Dialect: ${row.name}\nRegion: ${row.region}\nSpeakers: ${row.speakers.toLocaleString()}`);
};

const AdminDialects = () => {
  return (
    <>
      <AdminHeader />
      <div className="admin-content">
        {/* <h4>Dialects</h4> */}
        {/* <Row className="mb-4">
          <Col md={4}>
            <Card className="admin-cards">
              <Card.Body>
                <Card.Title>Total Dialects</Card.Title>
                <h3 className="text-primary">{sampleDialects.length}</h3>
                <Card.Text>Manage all dialects in the system.</Card.Text>
                <Button variant="primary">Add New Dialect</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Dialect List</Card.Title>
            <DataTable
              columns={columns}
              data={sampleDialects}
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

export default AdminDialects;
