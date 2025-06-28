import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader.jsx';
import DataTable from 'react-data-table-component';
import { Card, Spinner } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './admin.css';
import { getFlaggedWords, deleteFlaggedWord, getDialects } from './services/dashboardService';

function formatDate(dateString) {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const columns = (onDelete, dialectMap) => [
  { name: 'Word', selector: row => row.word || '-', sortable: true },
  { name: 'Reason', selector: row => row.reason || '-', sortable: true },
  { name: 'Dialect', selector: row => dialectMap[row.dialect_id] || row.dialect_id || '-', sortable: true },
  { name: 'Date', selector: row => formatDate(row.createdAt), sortable: true },
  {
    name: 'Actions',
    cell: row => (
      <FaTrash
        size={18}
        style={{ color: '#dc3545', cursor: 'pointer' }}
        title="Delete"
        onClick={e => { e.stopPropagation(); onDelete(row); }}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  },
];

const AdminFlaggedWords = () => {
  const [flaggedWords, setFlaggedWords] = useState([]);
  const [dialectMap, setDialectMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchFlaggedWords = async () => {
    setLoading(true);
    try {
      const response = await getFlaggedWords();
      setFlaggedWords(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err?.error || 'Failed to fetch flagged words');
    }
    setLoading(false);
  };

  const fetchDialects = async () => {
    try {
      const data = await getDialects();
      const dialectsArr = Array.isArray(data.data) ? data.data : [];
      const map = {};
      dialectsArr.forEach(d => { map[d.id] = d.dialect_name; });
      setDialectMap(map);
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchDialects();
    fetchFlaggedWords();
  }, []);

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete flagged word "${row.word}"?`)) return;
    setDeleting(true);
    try {
      await deleteFlaggedWord(row.id);
      fetchFlaggedWords();
    } catch (err) {
      setError(err?.error || 'Failed to delete flagged word');
    }
    setDeleting(false);
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-content">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Flagged Words / Reported Content</Card.Title>
            {error && <div className="alert alert-danger">{error}</div>}
            <DataTable
              columns={columns(handleDelete, dialectMap)}
              data={flaggedWords}
              highlightOnHover
              pointerOnHover
              pagination
              striped
              progressPending={loading || deleting}
              noDataComponent={loading ? <Spinner animation="border" /> : 'No flagged words found.'}
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AdminFlaggedWords;
