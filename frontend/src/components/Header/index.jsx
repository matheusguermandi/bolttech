import { Container, Row } from "react-bootstrap";

import logo from "../../assets/logo.svg";
import style from "./styles.module.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../hooks/auth";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    try {
      if (window.confirm("Are you leaving?")) {
        signOut();
      }
    } catch (error) {
      alert("Oops...some error happened, try again!");
    }
  };

  return (
    <Container>
      <Row className={style.header}>
        <img src={logo} alt="Logo" />
        <div>
          <span>{user.name} &nbsp;&nbsp;</span>
          <AiOutlineLogout size={20} className={style.signOut} onClick={handleSignOut} />
        </div>
      </Row>
    </Container>
  );
};

export default Header;
