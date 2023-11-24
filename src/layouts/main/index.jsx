import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer';
import SideBar from './sidebar';
import Rightbar from './rightbar';
import Navbar from './navbar';

function MainLayout({ children }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
			<Box sx={{ display: 'flex', height: 1 }}>
				<Header />

				<SideBar />

				<Box>{children}</Box>

				<Rightbar />

				<Footer />
			</Box>
		</Box>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
