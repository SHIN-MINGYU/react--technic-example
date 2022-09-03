import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Error_404 = () => {
  return (
    <ErrorBox>
      <span>this is error site for status code 404</span>
      <Link to={"/"}>click this link go to main page</Link>
    </ErrorBox>
  );
};

const ErrorBox = styled(Grid)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Error_404;
