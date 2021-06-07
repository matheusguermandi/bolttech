import { Spinner } from "react-bootstrap";

const Loading = ({ ...rest }) => {
  return <Spinner animation="border" role="status" {...rest} />;
};

export default Loading;
