import { Button, CardActions } from "@mui/material";

interface ActionsProps {
  sourceMap: Array<string>;
  action: (funcName: string) => void;
}

const Actions = ({ sourceMap, action }: ActionsProps) => {
  return (
    <CardActions>
      {sourceMap.map((el, idx) => {
        return (
          <Button
            key={idx}
            onClick={() => {
              action(el);
            }}>
            {el}
          </Button>
        );
      })}
    </CardActions>
  );
};

export default Actions;
