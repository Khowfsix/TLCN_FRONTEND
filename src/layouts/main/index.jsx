import { Container, Box } from '@mui/material';
import PropTypes from 'prop-types';

import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';

function MainLayout({ children }) {
	return (
		<Box
			sx={{
				width: '100vh',
				minHeight: '100vh',
			}}>
			<Topbar />
			<Container>
				<Box className="content" sx={{ marginTop: '100px' }}>
					<Outlet />
				</Box>
			</Container>
		</Box>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
