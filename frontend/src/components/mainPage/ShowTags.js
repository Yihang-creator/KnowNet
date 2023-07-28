import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

const ShowTags = (props) => {
  return (<>
    {/* <h2 style={{ display: 'inline'}}>Tags: </h2> */}
    <Stack style={{ display: 'inline'}} direction="row" spacing={2}>
      {props.tags.map((tag) => (
        <Button variant="text">#{tag}</Button>
      ))}
    </Stack>
    </>
  );
};
export default ShowTags;
