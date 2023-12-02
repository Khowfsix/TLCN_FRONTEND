import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6e5dcf',
			light: 'skyblue',
			dark: '#010101',
		},
		secondary: {
			main: '#15c630',
			light: 'white',
		},
		otherColor: {
			main: '#999',
		},
	},
});

export default theme;
