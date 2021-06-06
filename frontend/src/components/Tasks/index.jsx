import style from "./styles.module.css";

const Tasks = ({children}) => {
  return (
    <div className={style.container}>
     {children}
    </div>
  );
};

export default Tasks;
