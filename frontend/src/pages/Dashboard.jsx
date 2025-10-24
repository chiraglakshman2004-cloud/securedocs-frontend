import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiService from "../services/api";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "user";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [filesData, activitiesData] = await Promise.all([
          apiService.getFiles(),
          apiService.getActivityLogs()
        ]);
        
        setFiles(filesData);
        setActivities(activitiesData.slice(0, 5)); // Get last 5 activities
        setError("");
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalUploads = files.length;
  const recentUploads = files.slice(0, 3).map(file => ({
    file: file.originalname,
    time: new Date(file.createdAt).toLocaleString()
  }));

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const ev = await apiService.getFiles({ category: 'events' });
        setEvents(Array.isArray(ev) ? ev.slice(0, 5) : []);
      } catch (e) {
        // ignore dashboard events errors to not block dashboard
      }
    };
    fetchEvents();
  }, []);

  return (
    <Container fluid className="mt-4 px-4">
      {/* Hero Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Welcome back, {username}</h2>
          <p className="text-muted">SecureDocs Dashboard - {role.charAt(0).toUpperCase() + role.slice(1)}</p>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          </Col>
        </Row>
      )}

      {loading && (
        <Row className="mb-4">
          <Col>
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Stat Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-text fs-2 text-primary me-3"></i>
                <div>
                  <h5 className="mb-0">{totalUploads}</h5>
                  <small className="text-muted">Total Documents</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-check fs-2 text-success me-3"></i>
                <div>
                  <h5 className="mb-0">{role.charAt(0).toUpperCase() + role.slice(1)}</h5>
                  <small className="text-muted">Role</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check fs-2 text-warning me-3"></i>
                <div>
                  <h5 className="mb-0">Secure</h5>
                  <small className="text-muted">System Status</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-cloud-upload fs-2 text-info me-3"></i>
                <div>
                  <h5 className="mb-0">{activities.length}</h5>
                  <small className="text-muted">Recent Activities</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Quick Actions</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Button as={Link} to="/upload" variant="primary">
                  <i className="bi bi-cloud-upload me-2"></i>Upload File
                </Button>
                <Button as={Link} to="/files" variant="outline-primary">
                  <i className="bi bi-folder me-2"></i>View Files
                </Button>
                <Button as={Link} to="/activity-log" variant="outline-info">
                  <i className="bi bi-clock-history me-2"></i>Activity Log
                </Button>
                {role === "admin" && (
                  <Button as={Link} to="/admin-panel" variant="outline-warning">
                    <i className="bi bi-gear me-2"></i>Admin Panel
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Recent Uploads</h5>
              {recentUploads.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {recentUploads.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                        {item.file}
                      </span>
                      <small className="text-muted">{item.time}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No files uploaded yet. <Link to="/upload">Upload your first file!</Link></p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Recent Activities</h5>
              {activities.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {activities.map((activity, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        <i className="bi bi-activity me-2 text-info"></i>
                        {activity.action}
                      </span>
                      <small className="text-muted">
                        {new Date(activity.timestamp).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No recent activities</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Events */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Upcoming/Recent Events</h5>
              {events.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {events.map((ev, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        <i className="bi bi-calendar-event me-2 text-warning"></i>
                        {ev.title || ev.originalname}
                      </span>
                      <small className="text-muted">
                        {new Date(ev.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No events found</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
