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

	const [listGradeMethod, setListGradeMethod] = useState([]);
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
		axios.get('gradeMethod/getAll').then((response) => {
			setListGradeMethod(response.data);
		});
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	return (
		<Box sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', position: 'fixed' }}>
			<Box>
				<Typography variant="h3">{examContent && examContent.title}</Typography>

				<Typography variant="subtitle1">
					<Typography variant="overline">Thời gian bắt đầu: </Typography>
					{examContent && formatedDateTime(examContent.datetimeStart)}
				</Typography>

				<Typography variant="subtitle1">
					<Typography variant="overline">Thời gian kết thúc: </Typography>
					{examContent && formatedDateTime(examContent.datetimeEnd)}
				</Typography>
				<Typography variant="subtitle1">
					<Typography variant="overline">Thời gian làm bài: </Typography>
					{examContent && examContent.timeAttempt} phút
				</Typography>
				<Typography variant="subtitle1">
					<Typography variant="overline">Số lần làm bài cho phép: </Typography>
					{examContent && examContent.numberAttempt}
				</Typography>
				<Typography variant="subtitle1">
					<Typography variant="overline">Phương thức tính điểm: </Typography>
					{examContent && listGradeMethod && listGradeMethod.find((item) => item.gid == examContent.gradeMethod).name}
				</Typography>
			</Box>

			<Typography sx={{ marginTop: '20px' }} variant="h4">
				Làm bài kiểm tra:
			</Typography>
			<Button variant="outlined">Làm bài</Button>

			<Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', marginTop: '20px' }}>
				<Button variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={handleOpenDelDi}>
					Xóa bài tập
				</Button>
				<Button
					variant="outlined"
					startIcon={<UpdateOutlined />}
					onClick={() => {
						console.log(examContent);
						navigate(`/class/exam/edit?eid=${params.get('eid')}`, { state: { initData: examContent } });
					}}>
					Chính sửa bài kiểm tra
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
