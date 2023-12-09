import { Container } from '@mui/material';
// import PropTypes from 'prop-types';

import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';
import { Box } from '@material-ui/core';

function MainLayout() {
	return (
		<Container>
			<Topbar />
			<Container
				className="content"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					width: '100%',
					marginTop: '20px',
				}}>
				<Outlet />
			</Container>
		</Container>
	);
}

export default MainLayout;
