import { Container } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

function MainLayout({ children }) {
	return (
		<Box
			sx={{
				width: '100vh',
				minHeight: '100vh',
			}}
		>
			<Topbar />
			<div className="container">
				<Sidebar />
				<div className="content">
					<Outlet />
				</div>
			</div>
		</Box>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
