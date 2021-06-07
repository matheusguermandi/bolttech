import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../components/Header";
import Form from "../../components/Form";
import Projects from "../../components/Projects";
import Loading from "../../components/Loading";
import { useProject } from "../../hooks/project";

const Dashboard = () => {
  const { projects, loading } = useProject();

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Form />
          <Col xs={8}>
            {loading ? (
              <Row style={{ justifyContent: "center" }}>
                <Loading />
              </Row>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <Projects key={project.id} project={project} />
              ))
            ) : (
              <h3 className="text-center">No project registered</h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
