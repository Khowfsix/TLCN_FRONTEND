import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';
import theme from './theme.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
);
