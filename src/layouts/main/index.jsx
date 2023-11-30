import { Container, Box } from '@mui/material';
// import PropTypes from 'prop-types';

import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<Container maxWidth={false}>
			<Topbar />
			{/* <Box> */}
			<Container
				maxWidth={false}
				className="content"
				sx={{
					// marginTop: '200px',
					width: '100vw',
					// height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Outlet />
			</Container>
			{/* </Box> */}
		</Container>
	);
}

export default MainLayout;

// MainLayout.propTypes = {
// 	children: PropTypes.node,
// };
