import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const AppNavbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SecureDocs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {token && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/upload">
                Upload
              </Nav.Link>
              <Nav.Link as={Link} to="/activity">
                Activity Log
              </Nav.Link>
              <Nav.Link as={Link} to="/admin">
                Admin Panel
              </Nav.Link>
            </Nav>
          )}
          {token && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
