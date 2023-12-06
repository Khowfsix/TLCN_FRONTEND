import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

import { toast } from 'react-toastify';

import axios from '../../../apis/axiosConfig';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: '500px',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export default function TopBar() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [loading, setLoading] = useState(false);

	const pages = [
		{ name: 'Khóa học', link: '/listCourses' },
		{ name: 'Lớp', link: '/listClasses' },
		{ name: 'Blogs', link: '/blogs' },
		{ name: 'Thông tin', link: '/about' },
	];

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleLogoutMenu = () => {
		setLoading(true);

		// useEffect(() => {
		axios
			.get(`/auth/logout/${localStorage.getItem('accessToken')}`)
			.then((res) => {
				localStorage.removeItem('accessToken');
				navigate('/login');

				toast.success('Đã đăng xuất', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			})
			.catch((err) => {
				console.log(err);
			});
		// }, []);

		setLoading(false);
		handleMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
			<MenuItem onClick={handleMenuClose}>Tài khoản</MenuItem>
			{localStorage.getItem('accessToken') && <MenuItem onClick={handleLogoutMenu}>Đăng xuất</MenuItem>}
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>

			<MenuItem>
				<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			{loading ? (
				<CircularProgress sx={{ color: 'black', justifyContent: 'center' }} />
			) : (
				<AppBar position="fixed">
					<Toolbar>
						<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
							{/* <MenuIcon /> */}
						</IconButton>
						<Typography onClick={() => navigate('/Home')} variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
							LEARNING WEB
						</Typography>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
						</Search>

						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									href={page.link}
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={{
										// my: 2,
										color: '#ffffff',
										display: 'block',
										'&:hover': { color: 'white' },
									}}>
									{page.name}
								</Button>
							))}
						</Box>

						{/* <Box sx={{ flexGrow: 1 }} /> */}
						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
								<Badge badgeContent={17} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							<IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
								<AccountCircle />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			)}
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
