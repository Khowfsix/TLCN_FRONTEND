import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import axios from '../../../apis/axiosConfig';
import { Box, Button, Dialog, Typography } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

import { DeleteForeverOutlined } from '@material-ui/icons';
import { UpdateOutlined } from '@material-ui/icons';

import { toast } from 'react-toastify';

import formatedDateTime from '../../../utils/formatedDatetime';
import Transition from '../../../utils/transition';

import EditAssessment from '../../../components/class/assessment/editAssessment.component';

export default function Assessment() {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [assessmentContent, setAssessmentContent] = useState(null);

	const [openDelDi, setOpenDelDi] = useState(false);
	const [openUpdDi, setOpenUpdDi] = useState(false);

	const handleOpenDelDi = () => {
		setOpenDelDi(true);
	};

	const handleCloseDelDi = () => {
		setOpenDelDi(false);
	};

	const handleOpenUpdDi = () => {
		setOpenUpdDi(!openUpdDi);
	};

	const handleCloseUpdDi = () => {
		setOpenUpdDi(false);
	};

	const handleDelete = () => {
		console.log(`delete this topic`);

		// get struct of week.
		axios
			.get(`/classSubject/getById/${assessmentContent.classSubject}`)
			.then((response) => {
				let classSubject = null;
				classSubject = response.status == 200 ? response.data : null;

				// remove this topic from week
				let struct = classSubject.struct;
				console.log(struct);
				for (let key in struct) {
					if (struct[key].ID == params.get('aid') && struct[key].type == 'Assessment') {
						delete struct[key];
						break;
					}
				}

				console.log(classSubject);
				axios
					.put(`/classSubject/update/${classSubject.csid}`, classSubject)
					.then(() => {
						// delete this topic
						axios
							.delete(`/assessment/delete/${params.get('aid')}`)
							.then(() => {
								toast.success('Đã xóa bài tập', {
									position: 'top-right',
									autoClose: 3000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: 'dark',
								});
								navigate(`/class?cid=${classSubject.classID}`);
							})
							.catch((err) => {
								// Handle the error
								console.error(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

	const fetchData = () => {
		if (localStorage.getItem(`testing`) === 'false') {
			axios
				.request({
					method: 'get',
					url: `/assessment/getById/${params.get('aid')}`,
				})
				.then((response) => {
					if (response.data) {
						setAssessmentContent(response.data);
						console.log(response.data);
					}
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		}
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	return (
		<Box sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', position: 'fixed' }}>
			<Box>
				<Typography variant="h3">{assessmentContent && assessmentContent.title}</Typography>

				<Typography variant="subtitle1">
					<b>Thời gian bắt đầu: </b>
					{assessmentContent && formatedDateTime(assessmentContent.datetimeStart)}
				</Typography>
				<Typography variant="subtitle1">
					<b>Thời gian thu bài: </b>
					{assessmentContent && formatedDateTime(assessmentContent.datetimeCutoff)}
				</Typography>
				<Typography variant="subtitle1">
					<b>Thời gian kết thúc: </b>
					{assessmentContent && formatedDateTime(assessmentContent.datetimeEnd)}
				</Typography>
			</Box>

			<Box sx={{ marginTop: '20px', textAlign: 'left' }}>
				{assessmentContent &&
					assessmentContent.content &&
					assessmentContent.content.map((item, index) => {
						if (item.type == 'link') {
							return (
								<Box key={index} sx={{ marginTop: '20px' }}>
									<Typography variant="h5">Link:</Typography>
									<a href={item && item.value} target="_blank" rel="noreferrer">
										{item && `Link đính kèm đây`}
									</a>
								</Box>
							);
						} else if (item.type == 'content') {
							return (
								<Box key={index} sx={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
									<Typography variant="h5">Nội dung:</Typography>
									<div dangerouslySetInnerHTML={{ __html: item && item.value }} />
								</Box>
							);
						}
					})}
				<Typography variant="h5"></Typography>
			</Box>

			<Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', marginTop: '20px', gap: '20px' }}>
				{localStorage.getItem('role') == 'lecturer' ? (
					<>
						<Button variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={handleOpenDelDi}>
							Xóa bài tập
						</Button>
						<Button variant="outlined" startIcon={<UpdateOutlined />} onClick={handleOpenUpdDi}>
							Chính sửa bài tập
						</Button>
						<Button
							variant="outlined"
							startIcon={<UpdateOutlined />}
							onClick={() => {
								navigate(`/ListStudentSubmit?aid=${assessmentContent.aid}`, {
									state: { assessmentContent: assessmentContent },
								});
							}}>
							Chấm bài tập
						</Button>
					</>
				) : null}
				{localStorage.getItem('role') == 'student' ? (
					<Button
						variant="outlined"
						startIcon={<UpdateOutlined />}
						onClick={() => {
							navigate(`/SubmitAssessment?aid=${assessmentContent.aid}`, {
								state: {
									numAttempt: assessmentContent.numberAttempt,
								},
							});
						}}>
						Nộp bài tập
					</Button>
				) : null}
			</Stack>

			<Dialog open={openDelDi} onClose={handleCloseDelDi} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xóa bài tập</DialogTitle>
				<DialogContent>
					<DialogContentText>Chắc chưa bro :))) muốn xóa thật à</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelDi}>Thôi nghĩ lại rồi</Button>
					<Button onClick={() => handleDelete()}>Yup, xóa đi</Button>
				</DialogActions>
			</Dialog>

			{openUpdDi && <EditAssessment initData={assessmentContent} close={handleCloseUpdDi} fetchData={fetchData} />}
		</Box>
	);
}
