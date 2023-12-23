import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';

import axios from '../../../apis/axiosConfig';
import { toast } from 'react-toastify';

const SubmitById = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [grade, setGrade] = useState(0);
	const [submit, setSubmit] = useState(null);

	const handleGradeSubmission = () => {
		console.log(submit);

		if (grade >= 0 && grade <= 10) {
			axios
				.put(`studentAttemptAssessment/update/${params.get('submissionId')}`, submit)
				.then((response) => {
					if (response.status === 201 && response.data) {
						toast.success('Đã chấm điểm', {
							theme: 'dark',
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleChangeGrade = (event) => {
		setGrade(event.target.value);
		setSubmit((prev) => ({
			...prev,
			grade: event.target.value,
		}));
	};

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

				{submit &&
					submit.submition.map((item) => {
						if (item.type === 'content')
							return (
								<Typography variant="body1">
									<Typography variant="overline">Nội dung: </Typography>
									<br />
									<div dangerouslySetInnerHTML={{ __html: item && item.value }} />
								</Typography>
							);
						else
							return (
								<Typography variant="body1">
									<Typography variant="overline">Link: </Typography> {item.value}
								</Typography>
							);
					})}

				<TextField
					id="outlined-basic"
					type="number"
					label="Điểm"
					variant="outlined"
					value={grade}
					onChange={handleChangeGrade}
					inputProps={{
						min: 0,
						max: 10,
					}}></TextField>
				<Button variant="contained" onClick={handleGradeSubmission}>
					Chấm điểm
				</Button>
			</Box>
		</div>
	);
};

export default SubmitById;
