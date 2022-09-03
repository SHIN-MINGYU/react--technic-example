import { useLayoutEffect, useState } from "react";

type Props = {
  tabCount: number;
};

const Tab = ({ tabCount }: Props) => {
  const [tab, setTab] = useState<Array<JSX.Element>>([]);

  useLayoutEffect(() => {
    const initTab: Array<JSX.Element> = [];
    for (let i = 0; i < tabCount; i++) {
      initTab.push(
        <span key={i} style={{ whiteSpace: "pre" }}>
          &nbsp;
        </span>
      );
    }
    setTab(() => initTab);
  }, []);

  return <>{tab}</>;
};

export default Tab;
