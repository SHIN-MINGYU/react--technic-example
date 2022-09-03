import { Card, CardHeader, Grid } from "@mui/material";

import { CodeContainer, Title, Console } from "../../components/content";
import useIterator from "../../hooks/useIterator";

const GeneratorExam = () => {
  const { currentFunction, changeFunction, sourceMap } = useIterator(1, 10);

  return (
    <>
      <Title>Generator</Title>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title={<span>Example 1</span>}
              subheader={
                <span>単なるループステートメント(1から10まで出力)</span>
              }
            />
            <Console>
              <Console.Typing<number> iterator={currentFunction.Iterator} />
            </Console>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={<span>使用コード</span>} />
            <CodeContainer>
              <CodeContainer.Actions
                action={changeFunction}
                sourceMap={sourceMap}
              />
              <CodeContainer.Code code={currentFunction.funToStr} />
            </CodeContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneratorExam;
