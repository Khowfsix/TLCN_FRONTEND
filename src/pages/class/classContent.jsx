import React, { useEffect, useState } from 'react';
import { Box, Container, List, ListItem } from '@material-ui/core';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from '@mui/material';

function handleClickBreadCums(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function ClassContent() {
	const [classContents, setClassContents] = useState(null);

	return (
		<Box>
			{/* <Box position={'fixed'} onClick={handleClickBreadCums}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						MUI
					</Link>
					<Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
						Core
					</Link>
					<Typography>Breadcrumbs</Typography>
				</Breadcrumbs>
			</Box> */}

			<Box></Box>
		</Box>
	);
}

export default ClassContent;
