import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSearchContext } from './searchContext';

const ShowTags = (props) => {
  const goodTags = props.tags.filter((tag) => tag !== ' ');
  const { setSearchTerm, setSearchByTag, setLocalSearchTerm, setChecked } =
    useSearchContext();

  const handleTagSearch = (
    searchTerm,
    setLocalSearchTerm,
    setChecked,
    setSearchTerm,
    setSearchByTag,
  ) => {
    setLocalSearchTerm(searchTerm);
    setChecked(true);
    setSearchTerm(searchTerm);
    setSearchByTag(true);
  };
  return (
    <>
      <Stack style={{ display: 'inline' }} direction="row" spacing={2}>
        {goodTags.map((tag, index) => (
          <Link to={'/'}>
            <Button
              onClick={() =>
                handleTagSearch(
                  tag,
                  setLocalSearchTerm,
                  setChecked,
                  setSearchTerm,
                  setSearchByTag,
                )
              }
              key={index}
              variant="text"
            >
              #{tag}
            </Button>
          </Link>
        ))}
      </Stack>
    </>
  );
};
export default ShowTags;
