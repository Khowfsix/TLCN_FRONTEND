import { Container } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

function MainLayout({ children }) {
	return (
		<Container>
			<Topbar />
			<div className="container">
				<Sidebar />
				{children}
			</div>
		</Container>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
