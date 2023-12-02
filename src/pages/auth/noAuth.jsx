import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function NoAuth() {
	return (
		<Box>
			<Typography variant="h1">No Authentication Required</Typography>
			<Typography variant="body1">This page does not require authentication.</Typography>
		</Box>
	);
}
