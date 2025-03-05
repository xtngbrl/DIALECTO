import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Languages,
  Settings,
  LogOut,
  Trophy,
  UserCheck,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader.jsx';

const AdminHomePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [selectedStudent, setSelectedStudent] = useState('all');

  const statsData = {
    totalUsers: 3,
    activeUsers: 3,
    topContributors: [
      { name: 'Student A', progress: 95, lessons: 48 },
      { name: 'Student B', progress: 92, lessons: 45 },
      { name: 'Student C', progress: 88, lessons: 43 }
    ]
  };

  const students = [
    { id: 1, name: 'Student A', progress: 95, status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Student B', progress: 92, status: 'Active', lastActive: '1 hour ago' },
    { id: 3, name: 'Student C', progress: 88, status: 'Inactive', lastActive: '3 mins ago' },
  ];

  const progressData = [
    { name: 'Week 1', StudentA: 20, StudentB: 15, StudentC: 18 },
    { name: 'Week 2', StudentA: 40, StudentB: 35, StudentC: 30 },
    { name: 'Week 3', StudentA: 55, StudentB: 50, StudentC: 45 },
  ];
  
  const renderDashboard = () => (
    <Container fluid>
      <Row className="mb-5">
        <AdminHeader/>
      </Row>
      <Row className="mb-4 pt-5">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3 className="text-primary">{statsData.totalUsers}</h3>
              <Users size={32} className="text-primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <h3 className="text-success">{statsData.activeUsers}</h3>
              <UserCheck size={32} className="text-success" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Top Contributors</Card.Title>
              <h3 className="text-warning">{statsData.topContributors.length}</h3>
              <Trophy size={32} className="text-warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Students Overview</Card.Title>
              {/* <Form.Select 
                value={selectedStudent} 
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="all">All Students</option>
                {students.map(student => (
                  <option key={student.id} value={student.name}>{student.name}</option>
                ))}
              </Form.Select> */}
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.progress}%</td>
                      <td>
                        <span className={`badge ${student.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{student.status}</span>
                      </td>
                      <td>{student.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm mt-4 mb-4 pb-5">
            <Card.Body>
              <Card.Title>Progress Over Time</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {selectedStudent === 'all' ? (
                    students.map((student, index) => (
                      <Line
                        key={student.id}
                        type="monotone"
                        dataKey={`Student${student.name.split(' ')[1]}`} // Correct dataKey mapping
                        stroke={`hsl(${index * 60}, 70%, 50%)`}
                        strokeWidth={2}
                      />
                    ))
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={`Student${selectedStudent.split(' ')[1]}`} // Ensure the name format matches progressData
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Container fluid className="p-0">
      {activeItem === 'Dashboard' ? renderDashboard() : <h2>{activeItem}</h2>}
    </Container>
  );
};

export default AdminHomePage;
