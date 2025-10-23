import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const Upload = () => {
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setUploadSuccess(true);
  };

  return (
    <Container fluid className="mt-4 px-4">
      {/* Hero Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Upload Document</h2>
          <p className="text-muted">
            Securely upload files to your document vault
          </p>
        </Col>
      </Row>

      {/* Upload Card */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">
                <i className="bi bi-cloud-upload me-2 text-primary"></i>Select a
                file to upload
              </h5>
              <Form onSubmit={handleUpload}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  <i className="bi bi-upload me-2"></i> Upload
                </Button>
              </Form>

              {uploadSuccess && (
                <Alert variant="success" className="mt-3">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>{fileName}</strong> uploaded successfully (simulated)!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Upload;
