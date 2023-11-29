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
					width: '100%',
					marginTop: '100px',
					width: '100%',
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
