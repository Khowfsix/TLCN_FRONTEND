import React, { useEffect, useState } from 'react';
import CardClass from '../../../components/class/classCard';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

import axios from '../../../apis/axiosConfig';

function listCourses() {
	const [classList, setClassList] = useState([]);
	const dataClasses = localStorage.getItem('listClasses');

	if (dataClasses.length < 1) {
		setClassList(data);
	} else {
		useEffect(() => {
			axios
				.get(`/class/getAll`)
				.then((response) => {
					setClassList(response.data);
					localStorage.setItem('listClasses', response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		}, []);
	}

	return (
		<Box
			sx={{
				marginTop: '200px',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Masonry columns={4} spacing={2}>
				{classList.map((classs) => {
					// console.log(classs.isDeleted);
					if (classs.isDeleted === false) {
						return <CardClass key={classs.cid} class={classs}></CardClass>;
					}
				})}
			</Masonry>
		</Box>
	);
}

export default listCourses;
