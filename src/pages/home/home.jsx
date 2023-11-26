import './home.css';
import { Box, List, ListItem } from '@material-ui/core';

const something = [
	{
		name: 'c1',
		price: 100,
	},
	{ name: 'c2', price: 200 },
	{ name: 'c3', price: 300 },
];

export default function Home() {
	return (
		<>
			<Box>This is Home page</Box>
			<List>
				{something.map((element) => (
					<ListItem>
						<Box>
							<Box>name: {element.name}</Box>
							<Box>price: {element.price}</Box>
						</Box>
					</ListItem>
				))}
			</List>
		</>
	);
}
