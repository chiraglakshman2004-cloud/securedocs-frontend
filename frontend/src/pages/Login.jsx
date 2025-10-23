import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Confirm this logs to console
    console.log("Login triggered");

    // ✅ Set token
    localStorage.setItem("token", "demo-token");

    // ✅ Redirect
    navigate("/dashboard");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4 text-center">SecureDocs Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     localStorage.setItem("token", "demo-token");
//     navigate("/dashboard");
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <Card>
//             <Card.Body>
//               <h3 className="mb-4 text-center">SecureDocs Login</h3>
//               <Form onSubmit={handleLogin}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                   Login
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
