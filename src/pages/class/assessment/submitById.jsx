import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import axios from '../../../apis/axiosConfig';

const SubmitById = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [grade, setGrade] = useState(-1);

	const handleGradeSubmission = () => {
		console.log(`Chấm điểm ${grade}/10 cho bài nộp ${submissionId} của học viên ${studentId}`);
	};

	const [submit, setSubmit] = useState(null);

	const fetchData = () => {
		axios
			.get(`studentAttemptAssessment/getById/${params.get('submissionId')}`)
			.then((response) => {
				if (response.status === 200 && response.data) {
					setSubmit(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, [localStorage.getItem('accessToken')]);

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Chấm điểm bài nộp của học viên
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant="h6">
					Học viên ID: {params.get('studentId')} <br />
					Bài nộp ID: {params.get('assessmentId')}
				</Typography>

				<Typography variant="h5">Nội dung bài nộp: </Typography>

				{/* {submit && submi
				)} */}

				<Typography variant="body1">
					<Typography variant="overline">Nội dung: </Typography> aksjdflkas
				</Typography>
				<Typography variant="body1">
					<Typography variant="overline">Link: </Typography>
				</Typography>
				<Button variant="contained" onClick={handleGradeSubmission}>
					Chấm điểm
				</Button>
			</Box>
		</div>
	);
};

export default SubmitById;
