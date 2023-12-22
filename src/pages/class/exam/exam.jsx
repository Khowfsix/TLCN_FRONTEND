import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

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

import EditExam from '../../../components/class/exam/editExam.component';

export default function Exam() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [examContent, setExamContent] = useState(null);

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
			.get(`/classSubject/getById/${examContent.classSubject}`)
			.then((response) => {
				let classSubject = null;
				classSubject = response.status == 200 ? response.data : null;

				// remove this topic from week
				let struct = classSubject.struct;
				console.log(struct);
				for (let key in struct) {
					if (struct[key].ID == params.get('eid') && struct[key].type == 'Exam') {
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
							.delete(`/exam/delete/${params.get('eid')}`)
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
					url: `/exam/getById/${params.get('eid')}`,
				})
				.then((response) => {
					if (response.data) {
						setExamContent(response.data);
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
				<Typography variant="h3">{examContent && examContent.title}</Typography>

				<Typography variant="subtitle1">
					<b>Thời gian bắt đầu: </b>
					{examContent && formatedDateTime(examContent.datetimeStart)}
				</Typography>
				<Typography variant="subtitle1">
					<b>Thời gian thu bài: </b>
					{examContent && formatedDateTime(examContent.datetimeCutoff)}
				</Typography>
				<Typography variant="subtitle1">
					<b>Thời gian kết thúc: </b>
					{examContent && formatedDateTime(examContent.datetimeEnd)}
				</Typography>
			</Box>

			<Box sx={{ marginTop: '20px', textAlign: 'left' }}>
				{examContent &&
					examContent.content &&
					examContent.content.map((item, index) => {
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

			<Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', marginTop: '20px' }}>
				<Button variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={handleOpenDelDi}>
					Xóa bài tập
				</Button>
				<Button variant="outlined" startIcon={<UpdateOutlined />} onClick={handleOpenUpdDi}>
					Chính sửa bài tập
				</Button>
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

			{openUpdDi && <EditExam initData={examContent} close={handleCloseUpdDi} fetchData={fetchData} />}
		</Box>
	);
}
