import React, { useEffect, useState } from 'react';
import CardClass from '../../components/class/classCard';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

import axios from '../../apis/axiosConfig';

function listClasses() {
	const [classList, setClassList] = useState([]);
	const myRole = localStorage.getItem('role');
	const myUserId_withRole = localStorage.getItem('roleUserId');

	const getListClasses_Teacher = () => {
		useEffect(() => {
			axios
				.get(`/class/getClassByLecturerID/${myUserId_withRole}`)
				.then((response) => {
					setClassList(response.data.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		}, []);
	};

	const getListClasses_Student = () => {
		useEffect(() => {
			axios
				.get(`/class/getClassByStudentID/${myUserId_withRole}`)
				.then((response) => {
					setClassList(response.data.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		}, []);
	};

	const getListClasses_Admin = () => {
		useEffectively(() => {
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
	};

	if (myRole === 'student') {
		getListClasses_Student();
	} else if (myRole === 'teacher') {
		getListClasses_Teacher();
	} else if (myRole === 'admin') {
		getListClasses_Admin();
	}

	return (
		<Box
			sx={{
				marginTop: '200px',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Masonry columns={4} spacing={2}>
				{classList &&
					classList.map((classs) => {
						if (classs.isDeleted === false) {
							return <CardClass key={classs.cid} class={classs}></CardClass>;
						}
					})}
			</Masonry>
		</Box>
	);
}

export default listClasses;
