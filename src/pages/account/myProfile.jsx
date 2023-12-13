import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Avatar } from '@mui/material';

const MyProfile = () => {
	return (
		<Box sx={{ flexGrow: 1, p: 2 }}>
			<Grid container spacing={2} alignContent="center" justifyContent="center">
				<Grid item>
					<Avatar alt="Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 200, height: 200 }} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="h4">John Doe</Typography>
					<Typography variant="subtitle1">Software Engineer</Typography>
					<Typography variant="body1">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra, tortor vitae iaculis finibus, lacus lacus interdum est, vel aliquet magna tellus non nisi. Sed facilisis,
						turpis non consequat tristique, urna arcu bibendum mauris, nec lacinia metus nisl quis elit.
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					{/* Thông tin tài khoản tùy thuộc vào vai trò */}
					{/* Ví dụ: */}
					<Typography variant="body1">Account information based on role</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default MyProfile;
