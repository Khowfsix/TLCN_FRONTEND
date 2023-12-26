import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, Grid, Dialog } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

import { toast } from 'react-toastify';

import Transition from '../../utils/transition';
import axios from '../../apis/axiosConfig';

export default function WeekCard(props) {
	const week = props.content;
	const navigate = useNavigate();
	const [openDelDi, setOpenDelDi] = useState(false);
	const [openUpdDi, setOpenUpdDi] = useState(false);
	const [topicName, setTopicName] = useState(week.name);
	const [numberInClass, setNumberInClass] = useState(week.numberInClass);

	const handleOpenDelDi = () => {
		setOpenDelDi(true);
	};

	const handleCloseDelDi = () => {
		setOpenDelDi(false);
	};

	const handleOpenUpdDi = () => {
		setOpenUpdDi(true);
	};

	const handleCloseUpdDi = () => {
		setOpenUpdDi(false);
	};

	const handleInputChange_newtopicName = (event) => {
		setTopicName(event.target.value);
	};

	const handleInputChange_newNumberInClass = (event) => {
		setNumberInClass(event.target.value);
	};

	const handleUpdateSubject = () => {
		setOpenUpdDi(false);

		axios
			.get(`classSubject/getById/${week.key}`)
			.then((data) => {
				data.data.name = topicName;
				data.data.numberInClass = numberInClass;
				axios
					.put(`classSubject/update/${data.data.csid}`, data.data)
					.then((response) => {
						if (response.status == 200) {
							props.fetchData();

							toast.success('Đã cập nhật', {
								position: 'top-right',
								autoClose: 3000,
								closeOnClick: true,
								icon: '🚮',
								theme: 'dark',
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDeleteTopic = () => {
		console.log(`delete this week`);

		// call api delete this subject
		console.log(week.key);
		axios
			.delete(`classSubject/delete/${week.key}`)
			.then((response) => {
				if (response.status == 200) {
					props.fetchData();

					toast.success('Đã xóa chủ đề', {
						position: 'top-right',
						autoClose: 3000,
						closeOnClick: true,
						icon: '🚮',
						theme: 'dark',
					});
				}
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

	const Lecture = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6" component="div" color={'blue'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài giảng</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						navigate(`/lecture?lid=${props.topic.id}`);
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	const Exam = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6" component="div" color={'red'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài kiểm tra</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						navigate(`/exam?eid=${props.topic.id}`);
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	const Assessment = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6" component="div" color={'green'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài tập</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						navigate(`/assessment?aid=${props.topic.id}`, { state: { classId: props.classId } });
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	const handleAddTopic = (key) => {
		console.log(`add topic`);
		navigate(`/addSomething?subject=${key}`, { state: { classId: props.classId } });
	};

	return (
		<>
			<Box sx={{ minWidth: 1000, paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
				<Card variant="outlined" sx={{ backgroundColor: 'white' }}>
					<Box>
						<Typography variant="h4" color="text.secondary" gutterBottom>
							{week.name}
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								{week.topics &&
									week.topics.map((topic) => {
										if (topic.type === 'Lecture') {
											return <Lecture topic={topic} key={topic.id}></Lecture>;
										} else if (topic.type === 'Exam') {
											return <Exam topic={topic} key={topic.id}></Exam>;
										} else if (topic.type === 'Assessment') {
											return <Assessment topic={topic} key={topic.id}></Assessment>;
										}
									})}
							</Grid>
						</Grid>
					</Box>
					{localStorage.getItem('role') == 'lecturer' ? (
						<Box sx={{ paddingBottom: 2 }}>
							<ButtonGroup color="secondary" aria-label="medium secondary button group">
								<ButtonGroup color="primary" aria-label="small secondary button group">
									<Button onClick={() => handleAddTopic(week.key)}>Thêm nội dung</Button>
									<Button onClick={handleOpenUpdDi}>Chỉnh sửa</Button>
									<Button onClick={handleOpenDelDi}>Xóa chủ để</Button>
								</ButtonGroup>
							</ButtonGroup>
						</Box>
					) : null}
				</Card>
			</Box>

			<Dialog open={openDelDi} onClose={handleCloseDelDi} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xóa bài giảng</DialogTitle>
				<DialogContent>
					<DialogContentText>Chắc chưa bro :))) muốn xóa thật à</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelDi}>Thôi nghĩ lại rồi</Button>
					<Button onClick={handleDeleteTopic}>Yup, xóa đi</Button>
				</DialogActions>
			</Dialog>

			<Dialog fullWidth open={openUpdDi} onClose={handleCloseUpdDi} TransitionComponent={Transition} keepMounted>
				<DialogTitle>Cập nhật tên Chủ đề</DialogTitle>
				<DialogContent>
					<TextField autoFocus margin="dense" label="Tên Chủ Đề" type="text" value={topicName} fullWidth onChange={handleInputChange_newtopicName} />
					<TextField autoFocus margin="dense" label="Thứ tự trong lớp" type="number" value={numberInClass} fullWidth onChange={handleInputChange_newNumberInClass} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseUpdDi} color="primary">
						Hủy
					</Button>
					<Button onClick={() => handleUpdateSubject()} color="primary">
						Lưu
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
