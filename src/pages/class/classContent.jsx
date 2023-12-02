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

	// if (cacheClassContents) {
	// }

	return (
		<Box>
			<Box position={'fixed'} onClick={handleClickBreadCums}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						MUI
					</Link>
					<Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
						Core
					</Link>
					<Typography>Breadcrumbs</Typography>
				</Breadcrumbs>
			</Box>

			<Box className="branding">
				<Container className="container-fluid">
					<Box className="branding-inner">
						<Link className="site-name has-logo">
							<img className="site-logo" src="" alt="UTEx - HCMUTE" />
						</Link>

						<List className="main-nav d-none d-md-block">
							<ListItem className="nav-item">
								<Link className="nav-item nav-link" href="http://hcmute.edu.vn">
									Đại học Sư Phạm Kỹ thuật
								</Link>
							</ListItem>
							<ListItem className="nav-item">
								<Link className="nav-item nav-link" href="https://utex.hcmute.edu.vn/course/">
									Các khóa học
								</Link>
							</ListItem>
						</List>
					</Box>
				</Container>
			</Box>

			<Container></Container>
		</Box>
	);
}

export default ClassContent;
