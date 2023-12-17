import React, { useEffect, useState } from 'react';
import CardCourse from '../../components/course/cardCourse';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
	const [coursesList, setCourseList] = useState([]);
	const token = localStorage.getItem('accessToken');

	useEffect(() => {
		if (localStorage.getItem('listCourses') && localStorage.getItem('listCourses') !== 'null') {
			setCourseList(JSON.parse(localStorage.getItem('listCourses')));
		} else {
			axios
				.get(`/course/getAll`)
				.then((response) => {
					setCourseList(response.data);
					localStorage.setItem('listCourses', JSON.stringify(response.data));
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		}
	}, [token]);

	return (
		<Box
			sx={{
				marginTop: '200px',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Masonry columns={4} spacing={2}>
				{coursesList &&
					coursesList.map((course) => {
						if (course.isDeleted === false) {
							return <CardCourse key={course.cid} course={course}></CardCourse>;
						}
					})}
			</Masonry>
		</Box>
	);
}

export default listCourses;
