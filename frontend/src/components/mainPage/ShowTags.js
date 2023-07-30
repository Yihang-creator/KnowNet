import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

const ShowTags = (props) => {
	const goodTags = props.tags.filter((tag) => tag !== ' ');
	return (
		<>
			<Stack style={{ display: 'inline' }} direction="row" spacing={2}>
				{goodTags.map((tag) => (
					<Button variant="text">#{tag}</Button>
				))}
			</Stack>
		</>
	);
};
export default ShowTags;
