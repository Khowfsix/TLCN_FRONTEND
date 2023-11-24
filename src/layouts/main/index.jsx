import Header from './header';
import Footer from './footer';
import Menu from './menu';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function MainLayout({ children }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
			<Header />
			<Box sx={{ display: 'flex', height: 1 }}>
				<Menu />

				<Box>{children}</Box>

				<Footer />
			</Box>
		</Box>
	);
}

export default MainLayout;

MainLayout.propTypes = {
	children: PropTypes.node,
};
