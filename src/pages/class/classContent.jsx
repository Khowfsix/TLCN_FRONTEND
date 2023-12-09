import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, List, ListItem } from '@material-ui/core';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Fab, Link } from '@mui/material';
import WeekCard from '../../components/class/weekCark';

import axios from '../../apis/axiosConfig';
import { AddBox, AddSharp } from '@material-ui/icons';

const ClassContent = () => {
	const [params] = useSearchParams();
	const [classInfo, setClassInfo] = useState(null);
	const [classContents, setClassContents] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(`/class/getById/${params.get('cid')}`)
				.then((response) => {
					0;
					setClassInfo(response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});

			axios
				.get(`/class/getClassContentById/${params.get('cid')}`)
				.then((response) => {
					setClassContents(response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		};

		fetchData();
	}, []);

	return (
		<Box
			sx={{
				position: 'fixed',
				display: 'flex',
				flexDirection: 'column',

				// height: '100vh',
				// width: '100vw',
				// justifyContent: 'center',
				// alignItems: 'center',
				// justifyItems: 'center',
			}}>
			<Typography variant="h3">{classInfo && classInfo.className}</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Box>
					{classContents &&
						classContents.map((content) => {
							return <WeekCard key={content.key} content={content}></WeekCard>;
						})}
				</Box>
			</Box>

			{/* add topic */}

			<Box
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
					// marginBottom: '20px',
					// marginRight: '20px',
					// marginTop: '20px',
					// marginLeft: '20px',
					// zIndex: 1000,
				}}>
				<Fab color="primary" aria-label="add something">
					<AddSharp />
				</Fab>
			</Box>
		</Box>
	);
};

export default ClassContent;
