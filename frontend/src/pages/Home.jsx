import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to SecureDocs</h1>
      <p>Upload, manage, and protect your documents with ease.</p>
      <Button as={Link} to="/login" variant="primary">
        Login
      </Button>
    </Container>
  );
};

export default Home;
