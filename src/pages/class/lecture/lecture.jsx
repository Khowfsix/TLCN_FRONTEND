import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../../../apis/axiosConfig';

import { Box, Button, Dialog, Typography } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';
import { toast } from 'react-toastify';

import { DeleteForeverOutlined } from '@material-ui/icons';
import { UpdateOutlined } from '@material-ui/icons';

import formatedDateTime from '../../../utils/formatedDatetime';
import Transition from '../../../utils/transition';
import EditLecture from '../../../components/class/lecture/editLecture.component';

export default function Lecture() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [lectureContent, setLectureContent] = useState(null);

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
			.get(`/classSubject/getById/${lectureContent.classSubject}`)
			.then((response) => {
				let classSubject = null;
				classSubject = response.status == 200 ? response.data : null;

				// remove this topic from week
				let struct = classSubject.struct;
				console.log(struct);
				for (let key in struct) {
					if (struct[key].ID == params.get('lid') && struct[key].type == 'Lecture') {
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
							.delete(`/lecture/delete/${params.get('lid')}`)
							.then((r) => {
								if (r.status == 200) {
									toast.success('Đã xóa bài giảng', {
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
								}
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
		if (localStorage.getItem(`testing`) != true) {
			axios
				.request({
					method: 'get',
					url: `/lecture/getById/${params.get('lid')}`,
				})
				.then((response) => {
					if (response.data) {
						setLectureContent(response.data);
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
				<Typography variant="h3">{lectureContent && lectureContent.title}</Typography>

				<Typography variant="subtitle1">
					<b>Ngày đăng: </b>
					{lectureContent && formatedDateTime(lectureContent.datetimeUpload)}
				</Typography>
				<Typography variant="subtitle1">
					<b>
						<b>Ngày cập nhật: </b>
					</b>
					{lectureContent && formatedDateTime(lectureContent.datetimeTheLastUpdate)}
				</Typography>
				<Typography>
					<b>Link: </b>
					{lectureContent && lectureContent.link ? (
						<a href={lectureContent && lectureContent.link} target="_blank" rel="noreferrer">
							{lectureContent && `Link đính kèm nè`}
						</a>
					) : (
						`Hông có link đính kèm`
					)}
				</Typography>
			</Box>

			<Box>
				<Typography variant="h5">Nội dung:</Typography>
				<div dangerouslySetInnerHTML={{ __html: lectureContent && lectureContent.content }} />
			</Box>

			{localStorage.getItem('role') == 'lecturer' ? (
				<Stack direction="row" spacing={2}>
					<Button variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={handleOpenDelDi}>
						Xóa bài giảng
					</Button>
					<Button variant="outlined" startIcon={<UpdateOutlined />} onClick={handleOpenUpdDi}>
						Chính sửa bài giảng
					</Button>
				</Stack>
			) : null}

			<Dialog open={openDelDi} onClose={handleCloseDelDi} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xóa bài giảng</DialogTitle>
				<DialogContent>
					<DialogContentText>Chắc chưa bro :))) muốn xóa thật à</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelDi}>Thôi nghĩ lại rồi</Button>
					<Button onClick={() => handleDelete()}>Yup, xóa đi</Button>
				</DialogActions>
			</Dialog>

			{openUpdDi && <EditLecture initLecture={lectureContent} close={handleCloseUpdDi} fetchData={fetchData} />}
		</Box>
	);
}
