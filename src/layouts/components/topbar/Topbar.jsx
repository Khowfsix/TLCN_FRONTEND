import React from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';

function Topbar() {
	return (
		<Box className="topbar">
			<Box className="topbarWrapper">
				<Box className="topLeft">
					<Typography className="logo">lamaadmin</Typography>
				</Box>
				<Box className="topRight">
					<Box className="topbarIconContainer">
						<NotificationsNone />
						<Typography className="topIconBadge">2</Typography>
					</Box>
					<Box className="topbarIconContainer">
						<Language />
						<Typography className="topIconBadge">2</Typography>
					</Box>
					<Box className="topbarIconContainer">
						<Settings />
					</Box>
					<Avatar
						src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						alt=""
						className="topAvatar"
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default Topbar;
