import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

function Header() {
	return (
		<AppBar position="fixed" sx={{ height: '50px' }}>
			<Toolbar>
				<Typography variant="p" component="div">
					HEADER
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
