import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

import axios from '../../../apis/axiosConfig';

const ListStudentSubmit = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [listStudent, setListStudent] = useState([]);

	const fetchData = () => {
		axios
			.get(`studentJoinClass/getAll`)
			.then((response) => {
				if (response.status === 200 && response.data) {
					let data = response.data.filter((item) => item.classID === location.state.classID);
					setListStudent(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Chi tiết bài nộp của {student.name}
			</Typography>
			<Typography variant="h6" gutterBottom>
				Bài nộp: {submission}
			</Typography>
			<Typography variant="h6" gutterBottom>
				Điểm: {grade}/10
			</Typography>
		</div>
	);
};

export default ListStudentSubmit;
