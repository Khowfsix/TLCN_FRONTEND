import { AppBar, Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';

function Header() {
	return (
		// <AppBar position="fixed" sx={{ height: '50px' }}>
		// 	<Toolbar>
		// 		<Typography variant="p" component="div">
		// 			HEADER
		// 		</Typography>
		// 	</Toolbar>
		// </AppBar>

		<Container sx={{ backgroundColor: 'skyblue' }}>HEADER</Container>
	);
}

export default Header;
