import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer';
import SideBar from './sidebar';
import Rightbar from './rightbar';
import Navbar from './navbar';

function MainLayout({ children }) {
	return (
		<Stack>
			<Header />
			<SideBar />

			{/* content */}
			<Stack direction="row" spacing={5} justifyContent={'center'}>
				<Navbar />
				<Box>{children}</Box>
				<Rightbar />
			</Stack>

			<Footer />
		</Stack>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
