import {
  Button,
  Card,
  CardActions,
  CardContent as Content,
  CardHeader,
  Grid,
} from "@mui/material";
import styled from "styled-components";
import Code from "../../components/content/Code";
import Title from "../../components/content/Title";
import useIterator from "../../hooks/useIterator";
import "../../utils/helper";

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
            <CardContent>
              {Array.from(currentFunction.Iterator).map((el, idx) => {
                console.log(el);
                return (
                  <ConsoleTyping key={idx}>
                    <>console &gt;&gt;{el}</>
                  </ConsoleTyping>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={<span>使用コード</span>} />
            <CardActions>
              {sourceMap.map((el, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      changeFunction(el);
                    }}>
                    {el}
                  </Button>
                );
              })}
            </CardActions>
            <CardContent>
              <Code code={currentFunction.funToStr}></Code>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const CardContent = styled(Content)`
  margin: 10px;
  height: 400px;
  overflow-y: auto;
  background-color: beige;
`;

const ConsoleTyping = styled.p`
  color: base;
`;

export default GeneratorExam;
