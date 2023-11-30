import React, { useEffect, useState } from 'react';
import CardClass from '../../../components/class/classCard';

import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

import axios from '../../../apis/axiosConfig';

function listCourses() {
	const [classList, setClassList] = useState([]);

	useEffect(() => {
		axios
			.get(`/class/getAll`)
			.then((response) => {
				setClassList(response.data);
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	}, []);

	return (
		<Box
			sx={{
				marginTop: '200px',
			}}>
			<Masonry columns={4} spacing={5}>
				{classList.map((classs) => {
					console.log(classs.isDeleted);
					if (classs.isDeleted === false) {
						return <CardClass key={classs.cid} class={classs}></CardClass>;
					}
				})}
			</Masonry>
		</Box>
	);
}

export default listCourses;
