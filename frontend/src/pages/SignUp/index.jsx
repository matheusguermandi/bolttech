import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import styles from "./styles.module.css";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

const SignUp = () => {
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== passwordConf) {
        alert("Password and confirm password does not match");
        return;
      }

      const response = await api.post("users", {
        name,
        email,
        password,
        password_confirmation: passwordConf,
      });

      setUser(response.data);
      history.push("/dashboard");
    } catch (error) {
      alert("Email and/or password invalid!");
    }
  };

  return (
    <Container>
      <Row className={styles.contain}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
        <Col className={styles.formSingUp} xs lg="4">
          <h2 className="text-center">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
                minLength="8"
                maxLength="20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password confirmation"
                minLength="8"
                maxLength="20"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              style={{ width: "100%" }}
            >
              Sign Up
            </Button>
            <div className={styles.linkSignIn}>
              Already registered?&nbsp;<Link to="/">Sign In</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
