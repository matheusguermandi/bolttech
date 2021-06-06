import { Form as FormProject, Col, Button } from "react-bootstrap";
import style from "./styles.module.css";

const Form = () => {
  return (
    <Col xs={4} className={style.contain}>
      <div className={style.form}>
        <h4 className="text-center">Create a new project</h4>
        <FormProject style={{ marginTop: "8px" }}>
          <FormProject.Group controlId="formBasicEmail">
            <FormProject.Control
              required
              type="text"
              placeholder="Project name"
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
