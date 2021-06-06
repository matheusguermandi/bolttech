import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const SignIn = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      history.push("/dashboard");
    } catch (error) {
      alert("Email and/or password invalid!");
    }
  };

  return (
    <Container>
      <Row className={styles.contain}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
        <Col className={styles.formSignIn} xs lg="4">
          <h2 className="text-center">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              style={{ width: "100%" }}
            >
              Sign In
            </Button>
            <div className={styles.linkSignUp}>
              New around here?&nbsp;<Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
