import { Container } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

function MainLayout({ children }) {
	return (
		<>
			<Topbar />
			<div className="container">
				<Sidebar />
				<div className="content">CONTENT</div>
			</div>
		</>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
