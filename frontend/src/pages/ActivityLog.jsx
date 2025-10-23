import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ActivityLog = () => {
  const activities = [
    { type: "Upload", file: "report.pdf", time: "2 mins ago", user: "Chirag" },
    { type: "Login", file: null, time: "10 mins ago", user: "Admin" },
    {
      type: "Upload",
      file: "invoice.xlsx",
      time: "30 mins ago",
      user: "Chirag",
    },
    { type: "Admin Action", file: null, time: "1 hour ago", user: "Admin" },
    {
      type: "Upload",
      file: "presentation.pptx",
      time: "2 hours ago",
      user: "Chirag",
    },
  ];

  const iconMap = {
    Upload: "bi-upload",
    Login: "bi-person-check",
    "Admin Action": "bi-tools",
  };

  return (
    <Container fluid className="mt-4 px-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Activity Log</h2>
          <p className="text-muted">Track recent actions across the system</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              {activities.map((activity, idx) => (
                <div key={idx} className="d-flex align-items-start mb-4">
                  <div className="me-3">
                    <i
                      className={`bi ${
                        iconMap[activity.type]
                      } fs-3 text-primary`}
                    ></i>
                  </div>
                  <div>
                    <h6 className="mb-1">{activity.type}</h6>
                    <p className="mb-0">
                      {activity.file ? (
                        <strong>{activity.file}</strong>
                      ) : (
                        <em>No file involved</em>
                      )}
                    </p>
                    <small className="text-muted">
                      by {activity.user} — {activity.time}
                    </small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityLog;
