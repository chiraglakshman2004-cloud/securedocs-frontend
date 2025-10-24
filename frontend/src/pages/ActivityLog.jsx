import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import apiService from "../services/api";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await apiService.getActivityLogs();
        setActivities(data);
        setError("");
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to fetch activity logs");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const iconMap = {
    Upload: "bi-upload",
    Login: "bi-person-check",
    "Admin Action": "bi-tools",
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
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
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Card className="shadow-sm border-0">
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                {activities.length === 0 ? (
                  <div className="text-center text-muted">
                    <i className="bi bi-clock-history fs-1"></i>
                    <p>No activity logs found</p>
                  </div>
                ) : (
                  activities.map((activity, idx) => (
                    <div key={idx} className="d-flex align-items-start mb-4">
                      <div className="me-3">
                        <i
                          className={`bi ${
                            iconMap[activity.action?.includes("Upload") ? "Upload" : "Login"]
                          } fs-3 text-primary`}
                        ></i>
                      </div>
                      <div>
                        <h6 className="mb-1">{activity.action}</h6>
                        <p className="mb-0">
                          <small className="text-muted">
                            by {activity.user} — {formatTime(activity.timestamp)}
                          </small>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityLog;
