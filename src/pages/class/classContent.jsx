import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, List, ListItem } from '@material-ui/core';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from '@mui/material';
import WeekCard from '../../components/class/weekCark';

import axios from '../../apis/axiosConfig';

function handleClickBreadCums(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

const ClassContent = () => {
	const [params] = useSearchParams();
	const [classInfo, setClassInfo] = useState(null);
	const [classContents, setClassContents] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(`/class/getById/${params.get('cid')}`)
				.then((response) => {
					setClassInfo(response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});

			axios
				.get(`/class/getClassContentById/${params.get('cid')}`)
				.then((response) => {
					setClassContents(response.data.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		};

		fetchData();
	}, []);

	return (
		<Box position={'fixed'} sx={{ width: '100vw', justifyContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
			<Typography variant="h2">{classInfo && classInfo.className}</Typography>

			<Box>
				{classContents &&
					classContents.map((content) => {
						return <WeekCard key={content.key} content={content}></WeekCard>;
					})}
			</Box>
			{/* add topic */}
		</Box>
	);
};

export default ClassContent;
