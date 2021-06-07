import { useState } from "react";
import { Form as FormProject, Col, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/auth";
import { useProject } from "../../hooks/project";
import api from "../../services/api";
import style from "./styles.module.css";

const Form = () => {
  const { user } = useAuth();
  const { addProject } = useProject();
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("projects", {
        name,
        user_id: user.id,
      });

      addProject(response.data);
      setName("");
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  return (
    <Col xs={4} className={style.contain}>
      <div className={style.form}>
        <h4 className="text-center">Create a new project</h4>
        <FormProject onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
          <FormProject.Group controlId="formBasicEmail">
            <FormProject.Control
              required
              type="text"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormProject.Group>
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            style={{ width: "100%" }}
          >
            Create Project
          </Button>
        </FormProject>
      </div>
    </Col>
  );
};

export default Form;
