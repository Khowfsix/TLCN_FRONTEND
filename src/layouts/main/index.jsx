import { Container } from '@mui/material';
// import PropTypes from 'prop-types';

import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<Container maxWidth={false}>
			<Topbar />
			<Container
				maxWidth={false}
				className="content"
				sx={{
					// width: '100vw',
					// height: '100wh',
					marginTop: '100px',
					// justifyContent: 'center',
					display: 'flex',
				}}>
				<Outlet />
			</Container>
		</Container>
	);
}

export default MainLayout;

// MainLayout.propTypes = {
// 	children: PropTypes.node,
// };
