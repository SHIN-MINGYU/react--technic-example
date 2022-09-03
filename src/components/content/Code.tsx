import { useLayoutEffect, useState } from "react";
import "../../utils/helper";
import Tab from "../Tab";

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
  );
};

export default Code;
