import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../components/Header";
import Form from "../../components/Form";
import Projects from "../../components/Projects";
import { useProject } from "../../hooks/project";

const Dashboard = () => {
  const { projects } = useProject();

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Form />
          <Col xs={8}>
            {projects.map((project) => (
              <Projects project={project} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
