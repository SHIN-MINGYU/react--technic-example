import styled from "styled-components";

import Title from "../../content/Title";

import type { IProps } from "../../../types/utils.interface";
interface Props extends IProps {
  drawerWidth: number;
}

const Main = ({ drawerWidth, children }: Props) => {
  return (
    <MainWrapper drawerWidth={drawerWidth}>
      <MainTopPadder></MainTopPadder>
      {children}
    </MainWrapper>
  );
};

const MainWrapper = styled.main<Omit<Props, "children">>`
  margin-left: ${(props) => props.drawerWidth}px;
  padding: 16px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const MainTopPadder = styled.div`
  min-height: 64px;
`;

export { Title };

export default Main;
