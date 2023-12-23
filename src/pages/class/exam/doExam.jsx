import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

const DoExam = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		saeid: 1968415731,
		studentID: 231400,
		examID: 34,
		datetimeStart: null,
		datetimeSubmit: null,
		submition: {},
		grade: -1,
		isSummary: false,
	});

	const [listQuestions, setListQuestions] = useState(formData.question);

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const handleChange = (event) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowConfirmationDialog(true);

		listCorrects.map((correct) => {
			if (correct.correct.length < 2) {
				listQuestions.filter((question) => question.questionId === correct.questionId)[0].type = 'Short Answer';
			} else {
				listQuestions.filter((question) => question.questionId === correct.questionId)[0].type = 'Checkboxes';
			}
		});

		setFormData((prevFormData) => ({
			...prevFormData,
			numberAttempt: Number(prevFormData.numberAttempt),
			question: listQuestions,
			correct: listCorrects,
		}));
	};

	const handleConfirm = () => {
		// Do something with the form data
		setShowConfirmationDialog(false);

		console.log(formData);
		if (checkValidTime()) {
			axios
				.put(`exam/update/${location.state.initData.eid}`, formData)
				.then((response) => {
					if (response.status == 201) {
						toast.success('Bài kiểm tra đã được cập nhật thành công', {
							position: 'top-right',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							theme: 'dark',
						});
						navigate(`/exam?eid=${location.state.initData.eid}`);
					}
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		}
	};

	const handleCancel = () => {
		setShowConfirmationDialog(false);
	};

	const handleDatetimeChange = (name, value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const [listGradeMethod, setListGradeMethod] = useState([]);
	const fetchData = () => {
		axios.get('gradeMethod/getAll').then((response) => {
			setListGradeMethod(response.data);
		});
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	return (
		<>
			<Box>
				<form onSubmit={handleSubmit} style={{ flexDirection: 'column', gap: '30px' }}>
					<Typography variant="h3" marginTop={'20px'}>
						Làm bài kiểm tra
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
						<TextField variant="standard" name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required />

						<TextField variant="outlined" name="numberAttempt" type="number" label="Số lần nộp cho phép" value={formData.numberAttempt} inputProps={{ min: 1 }} />

						<Typography variant="h5" marginTop={'20px'}>
							Danh sách câu hỏi
						</Typography>

						<Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px', backgroundColor: '#E7E0EA' }}>
							<ListQuestionsForm listQuestions={listQuestions} setListQuestions={setListQuestions} listCorrects={listCorrects} setListCorrects={setListCorrects} />
						</Box>
					</Box>

					<Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Lưu bài kiểm tra
					</Button>
				</form>
			</Box>

			<Dialog open={showConfirmationDialog} onClose={handleCancel}>
				<DialogTitle>Xác nhận</DialogTitle>
				<DialogContent>
					<Typography variant="body1">Cái này quan trọng, nhớ kiểm tra cho kĩ</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Khoan, để coi kỹ lại
					</Button>
					<Button onClick={handleConfirm} color="secondary" variant="outlined" autoFocus>
						Kỹ rồi, thêm đi
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DoExam;
