import React, { useEffect, useState } from 'react';
import CardClass from '../../components/class/classCard';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

import axios from '../../apis/axiosConfig';

// const Item = styled(Paper)(({ theme }) => ({
// 	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
// 	...theme.typography.body2,
// 	padding: theme.spacing(0.5),
// 	textAlign: 'center',
// 	color: theme.palette.text.secondary,
// }));

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
		<Box>
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
