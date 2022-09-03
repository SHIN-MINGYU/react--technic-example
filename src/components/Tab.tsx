import { useLayoutEffect, useState } from "react";
type Props = {
  tabCount: number;
};

const Tab = ({ tabCount }: Props) => {
  const [tab, setTab] = useState<Array<JSX.Element>>([]);
  useLayoutEffect(() => {
    const initTab: Array<JSX.Element> = [];
    for (let i = 0; i < tabCount; i++) {
      initTab.push(<span style={{ whiteSpace: "pre" }}>&#9;</span>);
    }
    setTab(() => initTab);
  }, []);

  return <>{tab}</>;
};

export default Tab;
