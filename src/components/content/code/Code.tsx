import "../../../utils/helper";

import { CardContent } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";

import Tab from "./Tab";

type Props = {
  code: string;
};

const Code = ({ code }: Props) => {
  const [codeArr, setCodeArr] = useState<Array<string>>([]);
  const [tabCount, setTabCount] = useState<Array<number>>([]);

  useLayoutEffect(() => {
    const breakedCode = code.lineBreak();

    setCodeArr(() => breakedCode.brokenMessage);
    setTabCount(() => breakedCode.tabCount);
  }, [code]);

  return (
    <CodeWindow>
      <div>
        {codeArr.map((el, idx) => {
          return (
            <span key={idx}>
              {el}
              <br />
              <Tab tabCount={tabCount[idx]} />
            </span>
          );
        })}
      </div>
    </CodeWindow>
  );
};

const CodeWindow = styled(CardContent)`
  margin: 10px;
  height: 400px;
  overflow-y: auto;
  background-color: beige;
`;

export default Code;
