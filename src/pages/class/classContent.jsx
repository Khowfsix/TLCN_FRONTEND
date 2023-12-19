import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Dialog, Button, TextField, Typography } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Fab } from '@mui/material';
import WeekCard from '../../components/class/weekCark';

import Transition from '../../utils/transition';

import axios from '../../apis/axiosConfig';
import { AddSharp } from '@material-ui/icons';

const ClassContent = React.memo(() => {
	const [params] = useSearchParams();
	const [classInfo, setClassInfo] = useState(null);
	const [classContents, setClassContents] = useState([]);

	const [openDelDi, setOpenDelDi] = useState(false);
	const [openAddDi, setOpenAddDi] = useState(false);
	const [topicName, setTopicName] = useState('');

	const handleOpenDelDi = () => {
		setOpenDelDi(true);
	};

	const handleCloseDelDi = () => {
		setOpenDelDi(false);
	};

	const handleOpenAddDi = () => {
		setOpenAddDi(true);
	};

	const handleCloseAddDi = () => {
		setOpenAddDi(false);
	};

	const handleInputChange_newtopicName = (event) => {
		setTopicName(event.target.value);
	};

	const handleDeleteTopic = () => {
		console.log(`delete this week`);
	};

	const handleAddTopic = () => {
		// call api add
	};

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(`/class/getById/${params.get('cid')}`)
				.then((response) => {
					0;
					setClassInfo(response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});

			axios
				.get(`/class/getClassContentById/${params.get('cid')}`)
				.then((response) => {
					setClassContents(response.data);
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		};

		fetchData();
	}, [params]);

	return (
		<>
			<Box
				sx={{
					position: 'fixed',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Typography variant="h3">{classInfo && classInfo.className}</Typography>
				<Box sx={{ flexGrow: 1 }}>
					<Box>
						{classContents &&
							classContents.map((item, index) => {
								return <WeekCard key={index} content={item} delete={handleOpenDelDi} />;
							})}
					</Box>
				</Box>

				{/* add topic */}

				<Box
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
					}}>
					<Fab onClick={handleOpenAddDi} color="primary" aria-label="add something">
						<AddSharp />
					</Fab>
				</Box>
			</Box>

			<Dialog open={openDelDi} onClose={handleCloseDelDi} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xóa bài giảng</DialogTitle>
				<DialogContent>
					<DialogContentText>Chắc chưa bro :))) muốn xóa thật à</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelDi}>Thôi nghĩ lại rồi</Button>
					<Button onClick={() => handleDeleteTopic()}>Yup, xóa đi</Button>
				</DialogActions>
			</Dialog>

			<Dialog fullWidth open={openAddDi} onClose={handleCloseAddDi} TransitionComponent={Transition} keepMounted>
				<DialogTitle>Thêm Chủ Đề</DialogTitle>
				<DialogContent>
					<TextField autoFocus margin="dense" label="Tên Chủ Đề" type="text" fullWidth onChange={handleInputChange_newtopicName} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAddDi} color="primary">
						Hủy
					</Button>
					<Button onClick={() => handleAddTopic()} color="primary">
						Thêm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
});

export default ClassContent;
