import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

function handleClickBreadCums(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function ClassContent(props) {
	return (
		<Box>
			<div role="presentation" onClick={handleClickBreadCums}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						MUI
					</Link>
					<Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
						Core
					</Link>
					<Typography color="text.primary">Breadcrumbs</Typography>
				</Breadcrumbs>
			</div>

			<div className="branding">
				<div className="container-fluid">
					<div className="branding-inner">
						<a href="https://utex.hcmute.edu.vn" className="site-name has-logo">
							<img className="site-logo" src="" alt="UTEx - HCMUTE" />
						</a>

						<ul className="main-nav d-none d-md-block">
							<li className="nav-item">
								<a className="nav-item nav-link" href="http://hcmute.edu.vn">
									Đại học Sư Phạm Kỹ thuật
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-item nav-link" href="https://utex.hcmute.edu.vn/course/">
									Các khóa học
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</Box>
	);
}

ClassContent.propTypes = {};

export default ClassContent;
