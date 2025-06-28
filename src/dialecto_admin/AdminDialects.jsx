import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader.jsx';
import { Card, Button, Row, Col, Modal, Form, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './admin.css';
import {
  getDialects,
  createDialect,
  updateDialect,
  deleteDialect
} from './services/dashboardService';

const columns = (onEdit, onDelete) => [
  { name: 'Name', selector: row => row.dialect_name, sortable: true },
  { name: 'Games', selector: row => row.no_of_games ?? '-', sortable: true },
  { name: 'Status', selector: row => row.dialect_status || 'active', sortable: true },
  {
    name: 'Actions',
    cell: row => (
      <>
        <FaEdit
          size={18}
          style={{ color: '#007bff', cursor: 'pointer', marginRight: 16 }}
          title="Edit"
          onClick={e => { e.stopPropagation(); onEdit(row); }}
        />
        <FaTrash
          size={18}
          style={{ color: '#dc3545', cursor: 'pointer' }}
          title="Delete"
          onClick={e => { e.stopPropagation(); onDelete(row); }}
        />
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  },
];

const AdminDialects = () => {
  const [dialects, setDialects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentDialect, setCurrentDialect] = useState({ dialect_name: '', dialect_description: '', no_of_games: '', dialect_status: 'active' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchDialects = async () => {
    setLoading(true);
    try {
      const data = await getDialects();
      setDialects(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err?.error || 'Failed to fetch dialects');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDialects();
  }, []);

  const handleAdd = () => {
    setModalType('add');
    setCurrentDialect({ dialect_name: '', dialect_description: '', no_of_games: '', dialect_status: 'active' });
    setShowModal(true);
    setError('');
  };

  const handleEdit = (row) => {
    setModalType('edit');
    setCurrentDialect({ ...row });
    setShowModal(true);
    setError('');
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete dialect "${row.dialect_name}"?`)) return;
    setSaving(true);
    try {
      await deleteDialect(row.id);
      fetchDialects();
    } catch (err) {
      setError(err?.error || 'Failed to delete dialect');
    }
    setSaving(false);
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (modalType === 'add') {
        await createDialect({
          dialect_name: currentDialect.dialect_name,
          dialect_description: currentDialect.dialect_description,
          no_of_games: Number(currentDialect.no_of_games),
          dialect_status: currentDialect.dialect_status
        });
      } else {
        await updateDialect(currentDialect.id, {
          dialect_name: currentDialect.dialect_name,
          dialect_description: currentDialect.dialect_description,
          no_of_games: Number(currentDialect.no_of_games),
          dialect_status: currentDialect.dialect_status
        });
      }
      setShowModal(false);
      fetchDialects();
    } catch (err) {
      setError(err?.error || 'Failed to save dialect');
    }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-content">
        <Row className="mb-4">
          <Col md={4}>
            <Card className="admin-cards">
              <Card.Body>
                <Card.Title>Total Dialects</Card.Title>
                <h3 className="text-primary">{dialects.length}</h3>
                <Card.Text>Manage all dialects in the system.</Card.Text>
                <Button variant="primary" onClick={handleAdd}>Add New Dialect</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Dialect List</Card.Title>
            {error && <div className="alert alert-danger">{error}</div>}
            <DataTable
              columns={columns(handleEdit, handleDelete)}
              data={dialects}
              highlightOnHover
              pointerOnHover
              pagination
              striped
              progressPending={loading}
              noDataComponent={loading ? <Spinner animation="border" /> : 'No dialects found.'}
            />
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Form onSubmit={handleModalSave}>
            <Modal.Header closeButton>
              <Modal.Title>{modalType === 'add' ? 'Add New Dialect' : 'Edit Dialect'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentDialect.dialect_name}
                  onChange={e => setCurrentDialect({ ...currentDialect, dialect_name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={currentDialect.dialect_description || ''}
                  onChange={e => setCurrentDialect({ ...currentDialect, dialect_description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of Games</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={currentDialect.no_of_games}
                  onChange={e => setCurrentDialect({ ...currentDialect, no_of_games: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={currentDialect.dialect_status || 'active'}
                  onChange={e => setCurrentDialect({ ...currentDialect, dialect_status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
              {error && <div className="alert alert-danger">{error}</div>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={saving}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? <Spinner size="sm" animation="border" /> : 'Save'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminDialects;
