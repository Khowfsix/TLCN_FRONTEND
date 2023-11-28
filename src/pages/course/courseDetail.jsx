import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../apis/axiosConfig';

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

	return <div>{detail.courseName}</div>;
}
