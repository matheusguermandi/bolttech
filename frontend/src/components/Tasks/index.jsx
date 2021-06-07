import { Form } from "react-bootstrap";
import style from "./styles.module.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Tasks = ({
  children,
  data,
  handleUpdateNameTask,
  handleUpdateTask,
  handleDeleteTask,
  ...rest
}) => {
  const task = data;

  return (
    <div className={style.container} {...rest}>
      <div className={style.task}>
        {task.status === "TODO" && (
          <Form.Check
            checked={false}
            aria-label="option 1"
            onClick={() => handleUpdateTask(task.id)}
          />
        )}
        {children}
      </div>
      {task.status === "TODO" && (
        <div>
          <FiEdit
            className={style.optionIcon}
            onClick={() => handleUpdateNameTask(task.id)}
          />{" "}
          <FiTrash2
            className={style.optionIcon}
            onClick={() => handleDeleteTask(task.id)}
          />
        </div>
      )}
    </div>
  );
};

export default Tasks;
