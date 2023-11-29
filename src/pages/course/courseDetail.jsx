import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../apis/axiosConfig';
import { Box } from '@material-ui/core';

export default function CourseDetail() {
	const [detail, setDetail] = useState([]);
	const [params] = useSearchParams();

	useEffect(() => {
		axios
			.get(`/course/getById/${params.get('cid')}`)
			.then((response) => {
				setDetail(response.data);
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	}, []);

	return <Box>someting</Box>;
}
