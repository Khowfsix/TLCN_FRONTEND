import React, { useEffect, useState } from 'react';
import CardClass from '../../components/class/classCard';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';

import axios from '../../apis/axiosConfig';

function ListClasses() {
	const [classList, setClassList] = useState([]);
	const myRole = localStorage.getItem('role');
	const myUserId_withRole = localStorage.getItem('roleUserId');

	const getListClasses_Teacher = () => {
		axios
			.get(`/class/getClassByLecturerID/${myUserId_withRole}`)
			.then((response) => {
				setClassList(response.data);
				localStorage.setItem('listClasses', JSON.stringify(response.data));
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

	const getListClasses_Student = () => {
		axios
			.get(`/class/getClassByStudentID/${myUserId_withRole}`)
			.then((response) => {
				setClassList(response.data);
				localStorage.setItem('listClasses', JSON.stringify(response.data));
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

	const getListClasses_Admin = () => {
		axios
			.get(`/class/getAll`)
			.then((response) => {
				setClassList(response.data);
				localStorage.setItem('listClasses', JSON.stringify(response.data));
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

	useEffect(() => {
		if (localStorage.getItem('listClasses') && localStorage.getItem('listClasses') != 'null') {
			setClassList(JSON.parse(localStorage.getItem('listClasses')));
		} else {
			if (myRole === 'student') {
				getListClasses_Student();
			} else if (myRole === 'lecturer') {
				getListClasses_Teacher();
			} else if (myRole === 'admin') {
				getListClasses_Admin();
			}
		}
	}, [myRole]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
			<Typography variant="h3">Danh sách lớp</Typography>
			{classList && classList.length > 0 ? (
				<Masonry columns={4} spacing={2}>
					{classList &&
						classList.map((classs) => {
							if (classs.isDeleted === false) {
								return <CardClass key={classs.cid} class={classs}></CardClass>;
							}
						})}
				</Masonry>
			) : null}
		</Box>
	);
}

export default ListClasses;
