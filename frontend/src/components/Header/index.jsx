import { Container, Row } from "react-bootstrap";

import logo from "../../assets/logo.svg";
import style from "./styles.module.css";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  return (
    <Container>
      <Row className={style.header}>
        <img src={logo} alt="Logo" />
        <div>
          <span>Matheus &nbsp;&nbsp;</span>
          <AiOutlineLogout />
        </div>
      </Row>
    </Container>
  );
};

export default Header;
