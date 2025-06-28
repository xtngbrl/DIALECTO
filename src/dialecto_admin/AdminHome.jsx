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
import {
  dashboardGetTotalUsers,
  dashboardGetActiveUsers,
  dashboardGetTopContributors,
  dashboardGetRecentlyActiveUsers,
  dashboardGetTopStudentsProgressGraph
} from './services/dashboardService';

const AdminHomePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [selectedStudent, setSelectedStudent] = useState('all');

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topContributors, setTopContributors] = useState([]);
  const [students, setStudents] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          totalUsersRes,
          activeUsersRes,
          topContributorsRes,
          recentlyActiveUsersRes,
          progressGraphRes
        ] = await Promise.all([
          dashboardGetTotalUsers(),
          dashboardGetActiveUsers(),
          dashboardGetTopContributors(),
          dashboardGetRecentlyActiveUsers(),
          dashboardGetTopStudentsProgressGraph()
        ]);
        setTotalUsers(totalUsersRes.data || 0);
        setActiveUsers(activeUsersRes.data || 0);
        setTopContributors(topContributorsRes.data || []);
        setStudents(recentlyActiveUsersRes.data || []);
        setProgressData(progressGraphRes.data || []);
      } catch (err) {
        setError(err?.error || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statsData = {
    totalUsers,
    activeUsers,
    topContributors
  };
  
  const renderDashboard = () => (
    <div className="admin-content">
      <Container fluid>
        <Row className="mb-4 pt-5">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <h3 className="text-primary">{loading ? '...' : statsData.totalUsers}</h3>
                <Users size={32} className="text-primary" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Active Users</Card.Title>
                <h3 className="text-success">{loading ? '...' : statsData.activeUsers}</h3>
                <UserCheck size={32} className="text-success" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Top Contributors</Card.Title>
                <h3 className="text-warning">{loading ? '...' : statsData.topContributors.length}</h3>
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
                    {loading ? (
                      <tr><td colSpan="4">Loading...</td></tr>
                    ) : students.length === 0 ? (
                      <tr><td colSpan="4">No data</td></tr>
                    ) : students.map((student, idx) => {
                      // Get progress from first user_progresses entry (or 0 if not present)
                      const progresses = student.user.user_progresses || [];
                      const progress = progresses.length > 0 ? progresses[0].dialect_progress : 0;
                      // Status: Active if last_login within 24h, else Inactive
                      let status = 'Inactive';
                      if (student.last_login) {
                        const lastLogin = new Date(student.last_login);
                        const now = new Date();
                        const diffHours = (now - lastLogin) / (1000 * 60 * 60);
                        if (diffHours < 24) status = 'Active';
                      }
                      // Format last_login (e.g., June 27, 2025, 7:27 PM)
                      const lastActive = student.last_login
                        ? new Date(student.last_login).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })
                        : 'N/A';
                      return (
                        <tr key={student.id || idx}>
                          <td>{student.user.first_name} {student.user.last_name}</td>
                          <td>{progress}%</td>
                          <td>
                            <span className={`badge ${status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{status}</span>
                          </td>
                          <td>{lastActive}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <Card className="shadow-sm mt-4 mb-4 pb-5">
              <Card.Body>
                <Card.Title>Progress Over Time</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={loading ? [] : progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedStudent === 'all' ? (
                      students.map((student, index) => (
                        <Line
                          key={student.id || index}
                          type="monotone"
                          dataKey={`Student${student.name?.split(' ')[1]}`}
                          stroke={`hsl(${index * 60}, 70%, 50%)`}
                          strokeWidth={2}
                        />
                      ))
                    ) : (
                      <Line
                        type="monotone"
                        dataKey={`Student${selectedStudent.split(' ')[1]}`}
                        stroke="#f97316"
                        strokeWidth={2}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

      </Container>
    </div>
  );

  return (
    <>
      <AdminHeader />
      {error && <div className="alert alert-danger">{error}</div>}
      {activeItem === 'Dashboard' ? renderDashboard() : <div className="admin-content"><h2>{activeItem}</h2></div>}
    </>
  );
};

export default AdminHomePage;
