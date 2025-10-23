import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

const AdminPanel = () => {
  const users = [
    { name: "Chirag", role: "Admin", status: "Active" },
    { name: "Riya", role: "User", status: "Pending" },
    { name: "Arjun", role: "User", status: "Active" },
  ];

  return (
    <Container fluid className="mt-4 px-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Admin Panel</h2>
          <p className="text-muted">
            Manage users, documents, and system settings
          </p>
        </Col>
      </Row>

      {/* Admin Cards */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-people fs-2 text-primary me-3"></i>
                <div>
                  <h5 className="mb-0">3 Users</h5>
                  <small className="text-muted">User Accounts</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-lock fs-2 text-warning me-3"></i>
                <div>
                  <h5 className="mb-0">42 Documents</h5>
                  <small className="text-muted">Secured Files</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-lock fs-2 text-success me-3"></i>
                <div>
                  <h5 className="mb-0">System Secure</h5>
                  <small className="text-muted">Last scan: 2 hours ago</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Table */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">User Management</h5>
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            user.status === "Active" ? "success" : "secondary"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* System Controls */}
      <Row>
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">System Controls</h5>
              <Button variant="outline-success" className="me-2">
                <i className="bi bi-shield-check me-2"></i> Run Security Scan
              </Button>
              <Button variant="outline-secondary">
                <i className="bi bi-gear me-2"></i> System Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
