import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Chirag",
    role: "admin",
  };
  const recentUploads = [
    { file: "report.pdf", time: "2 mins ago" },
    { file: "invoice.xlsx", time: "15 mins ago" },
    { file: "contract.docx", time: "1 hour ago" },
  ];
  const totalUploads = 42;
  const uploadProgress = Math.round(
    (recentUploads.length / totalUploads) * 100
  );

  return (
    <Container fluid className="mt-4 px-4">
      {/* Hero Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Welcome back, {user.name}</h2>
          <p className="text-muted">SecureDocs Admin Dashboard</p>
        </Col>
      </Row>

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
                  <h5 className="mb-0">Admin</h5>
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
                  <h5 className="mb-0">{uploadProgress}%</h5>
                  <small className="text-muted">Upload Progress</small>
                </div>
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
            </Card.Body>
          </Card>
        </Col>

        {/* Upload Progress */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Upload Progress</h5>
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
              <p className="mt-3 text-muted">
                You’ve uploaded {recentUploads.length} of {totalUploads}{" "}
                documents recently.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
