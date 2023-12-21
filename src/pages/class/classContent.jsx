import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Dialog, Button, TextField, Typography } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import { AddSharp } from '@material-ui/icons';

import WeekCard from '../../components/class/weekCark';
import { toast } from 'react-toastify';

import Transition from '../../utils/transition';
import axios from '../../apis/axiosConfig';

const ClassContent = React.memo(() => {
	const [params] = useSearchParams();
	const [classInfo, setClassInfo] = useState(null);
	const [classContents, setClassContents] = useState([]);

	const [openAddDi, setOpenAddDi] = useState(false);
	const [topicName, setTopicName] = useState('');
	const [numberInClass, setNumberInClass] = useState(999);

	const handleOpenAddDi = () => {
		setOpenAddDi(true);
	};

	const handleCloseAddDi = () => {
		setOpenAddDi(false);
	};

	const handleInputChange_newtopicName = (event) => {
		setTopicName(event.target.value);
	};

	const handleInputChange_newNumberInClass = (event) => {
		setNumberInClass(event.target.value);
	};

	const handleAddTopic = () => {
		// add new topic
		let data = {
			name: topicName,
			classID: params.get('cid'),
			numberInClass: numberInClass,
			struct: {},
			isDeleted: false,
		};

		axios
			.post(`classSubject/create`, data)
			.then((response) => {
				if (response.status == 201) {
					setOpenAddDi(false);
					fetchData();

					toast.success('Đã thêm chủ đề', {
						position: 'top-right',
						autoClose: 3000,
						closeOnClick: true,
						icon: '➕',
						theme: 'dark',
					});
				} else {
					toast.error('Lỗi', {
						position: 'top-right',
						autoClose: 3000,
						closeOnClick: true,
						icon: '❌',
						theme: 'dark',
					});
				}
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

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

	useEffect(() => {
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
								return <WeekCard key={index} content={item} classId={params.get('cid')} fetchData={fetchData} />;
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

			<Dialog fullWidth open={openAddDi} onClose={handleCloseAddDi} TransitionComponent={Transition} keepMounted>
				<DialogTitle>Thêm Chủ Đề</DialogTitle>
				<DialogContent>
					<TextField autoFocus margin="dense" label="Tên Chủ Đề" type="text" fullWidth onChange={handleInputChange_newtopicName} />
					<TextField autoFocus margin="dense" label="Thứ tự trong lớp" type="number" defaultValue={999} value={numberInClass} fullWidth onChange={handleInputChange_newNumberInClass} />
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
