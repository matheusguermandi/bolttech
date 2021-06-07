import { useState } from "react";
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
import api from "../../services/api";

import moment from "moment";
import { useProject } from "../../hooks/project";

const Projects = (props) => {
  const { deleteProject } = useProject();
  const [project, setProject] = useState({ ...props.project });
  const [tasks, setTasks] = useState(project.tasks ? [...project.tasks] : []);
  const [task, setTask] = useState("");

  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("tasks/", {
        project_id: project.id,
        description: task,
      });

      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      if (window.confirm("Confirm completion task?")) {
        const response = await api.patch(`tasks/${id}`);

        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            return response.data;
          }
          return task;
        });

        setTasks([...newTasks]);
      }
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  const handleUpdateNameTask = async (id) => {
    try {
      do {
        var answerTask = prompt("New task description");
      } while (answerTask !== null && answerTask === "");

      const response = await api.put(`tasks/${id}`, {
        description: answerTask,
      });

      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return response.data;
        }
        return task;
      });

      setTasks([...newTasks]);
    } catch (error) {}
  };

  const handleDeleteTask = async (id) => {
    try {
      if (window.confirm("Confirm task deletion?")) {
        await api.delete(`tasks/${id}`);

        const newTasks = tasks.filter((task) => task.id !== id);

        setTasks([...newTasks]);
      }
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  const handleUpdateProject = async () => {
    try {
      do {
        var answer = prompt("New project name");
      } while (answer !== null && answer === "");

      await api.put(`projects/${project.id}`, {
        name: answer,
      });

      setProject({ ...project, name: answer });
    } catch (error) {}
  };

  const handleDeleteProject = async () => {
    try {
      if (window.confirm("Confirm project deletion?")) {
        await api.delete(`projects/${project.id}`);
        deleteProject(project.id);
      }
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  return (
    <Container className={style.contain}>
      <Row>
        <Col className={style.header}>
          <b>{project.name}</b>
          <div>
            <FiEdit
              className={style.optionIcon}
              onClick={handleUpdateProject}
            />{" "}
            <FiTrash2
              className={style.optionIcon}
              onClick={handleDeleteProject}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col
          xs={6}
          className={style.titleTask}
          style={{ borderRight: "2px solid grey" }}
        >
          TODO
        </Col>
        <Col xs={6} className={style.titleTask}>
          DONE
        </Col>
      </Row>

      {tasks.length > 0 ? (
        <Row>
          <Col xs={6} style={{ padding: "5px", borderRight: "2px solid grey" }}>
            {tasks &&
              tasks
                .filter((task) => task.status === "TODO")
                .map((task) => (
                  <Task
                    key={task.id}
                    data={task}
                    handleUpdateNameTask={handleUpdateNameTask}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                  >
                    {task.description}
                  </Task>
                ))}
          </Col>
          <Col xs={6} style={{ padding: "5px" }}>
            {tasks &&
              tasks
                .filter((task) => task.status === "DONE")
                .map((task) => (
                  <Task
                    key={task.id}
                    data={task}
                    handleUpdateNameTask={handleUpdateNameTask}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                  >
                    {task.description} <br />
                    Date Start:{" "}
                    {moment(task.date_start).format("MM/DD/YYYY HH:mm")}
                    <br />
                    Date End: {moment(task.date_end).format("MM/DD/YYYY HH:mm")}
                  </Task>
                ))}
          </Col>
        </Row>
      ) : (
        <Row className={style.noTask}>No registered tasks</Row>
      )}

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
