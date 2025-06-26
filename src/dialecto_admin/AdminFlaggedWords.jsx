import React from 'react';
import AdminHeader from './AdminHeader.jsx';
import DataTable from 'react-data-table-component';
import { Card } from 'react-bootstrap';
import './admin.css';

const flaggedWordsData = [
  { id: 1, word: 'slur1', context: 'Lesson 2', reportedBy: 'UserA', date: '2024-06-01', status: 'Pending' },
  { id: 2, word: 'offensive2', context: 'Game 1', reportedBy: 'UserB', date: '2024-06-02', status: 'Reviewed' },
  { id: 3, word: 'inappropriate3', context: 'Lesson 5', reportedBy: 'UserC', date: '2024-06-03', status: 'Pending' },
];

const columns = [
  { name: 'Word', selector: row => row.word, sortable: true },
  { name: 'Context', selector: row => row.context, sortable: true },
  { name: 'Reported By', selector: row => row.reportedBy, sortable: true },
  { name: 'Date', selector: row => row.date, sortable: true },
  { name: 'Status', selector: row => row.status, sortable: true },
];

const handleRowClicked = row => {
  alert(`Flagged Word: ${row.word}\nContext: ${row.context}\nStatus: ${row.status}`);
};

const FlaggedWords = () => (
  <>
    <AdminHeader />
    <div className="admin-content">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Flagged Words / Reported Content</Card.Title>
              <DataTable
                columns={columns}
                data={flaggedWordsData}
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

export default FlaggedWords;
