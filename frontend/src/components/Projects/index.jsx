import {
  Row,
  Col,
  Form,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import style from "./styles.module.css";
import { FiTrash2, FiPlus, FiEdit } from "react-icons/fi";

import Task from "../Tasks";
import { useState } from "react";
import api from "../../services/api";

const Projects = (props) => {
  const [project, setProject] = useState({ ...props.project });
  const [task, setTask] = useState("");

  const handleCreateTask = async (event) => {
    event.preventDefault();

    const response = await api.post("tasks/", {
      project_id: project.id,
      description: task,
    });

    const data = response.data;

    // setProject({ ...project, tasks: { ...project.tasks, data } });

    setTask("");
  };

  return (
    <Container className={style.contain}>
      <Row>
        <Col className={style.header}>
          <b>{project.name}</b>
          <div>
            <Button variant="secondary" size="sm">
              <FiEdit className={style.iconOptions} />
            </Button>{" "}
            <Button variant="secondary" size="sm">
              <FiTrash2 className={style.iconOptions} />
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col
          xs={6}
          className={style.titleTask}
          style={{ borderRight: "2px solid grey" }}
        >
          TODOs
        </Col>
        <Col xs={6} className={style.titleTask}>
          DONEs
        </Col>
      </Row>

      <Row>
        <Col xs={6} style={{ padding: "5px", borderRight: "2px solid grey" }}>
          {project.tasks
            .filter((task) => task.status === "TODO")
            .map((task) => (
              <Task>{task.description}</Task>
            ))}
        </Col>
        <Col xs={6} style={{ padding: "5px" }}>
          {project.tasks
            .filter((task) => task.status === "DONE")
            .map((task) => (
              <Task>{task.description}</Task>
            ))}
        </Col>
      </Row>

      <Row>
        <Col className={style.footer}>
          <Form onSubmit={handleCreateTask} style={{ width: "75%" }}>
            <InputGroup>
              <FormControl
                required
                placeholder="Task description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="success" type="submit">
                  <FiPlus className={style.iconOptions} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
