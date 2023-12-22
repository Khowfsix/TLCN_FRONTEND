import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import ListQuestionsForm from './newQuestionForm.component';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

export const AddExamTab = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		question: [],
		correct: [],
		datetimeStart: null,
		datetimeEnd: null,
		numberAttempt: 1,
		gradeMethod: null,
		classSubject: params.get('subject'),
		timeAttempt: 45,
	});

	const [listQuestions, setListQuestions] = useState([]);
	const [listCorrects, setListCorrects] = useState([]);

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const checkValidTime = () => {
		if (!formData.datetimeStart || !formData.datetimeEnd) {
			toast.error('Vui lòng chọn thời gian', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
			});
			return false;
		}

		if (formData.datetimeStart > formData.datetimeEnd) {
			toast.error('Thời gian bắt đầu phải trước thời gian kết thúc', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark',
			});
			return false;
		}

		listCorrects.forEach((correct) => {
			if (correct.length < 1) {
				toast.error('1 câu hỏi phải có tối thiểu 1 đáp án đúng', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'dark',
				});
				return false;
			}
		});

		return true;
	};

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
				listQuestions.filter((question) => question.questionId === correct.questionId)[0].type = 'Checkboxes';
			} else {
				listQuestions.filter((question) => question.questionId === correct.questionId)[0].type = 'Short Answer';
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
				.post(`/exam/create`, formData)
				.then((response) => {
					if (response.status === 201) {
						let data = {
							type: 'Exam',
							ID: response.data.eid,
							position: -1,
						};
						axios
							.put(`classSubject/addContentClassSubject/${response.data.classSubject}`, data)
							.then((response1) => {
								if (response1.status === 200) {
									toast.success(`Đã tạo bài kiểm tra ${response.data && response.data.title}`, {
										position: 'top-right',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										theme: 'dark',
									});
									navigate(`/class?cid=${location.state.classId}`);
								}
							})
							.catch((error) => {
								// Handle the error
								console.error(error);
							});
					}
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
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
			<Typography variant="h3" marginTop={'20px'}>
				Thêm bài kiểm tra
			</Typography>
			<Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
						<TextField variant="standard" name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required />

						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								name="datetimeStart"
								label="Thời gian bắt đầu"
								value={formData.datetimeStart}
								onChange={(value) => handleDatetimeChange('datetimeStart', value)}
								renderInput={(params) => <TextField {...params} />}
							/>
							<DateTimePicker
								name="datetimeEnd"
								label="Thời gian kết thúc"
								value={formData.datetimeEnd}
								onChange={(value) => handleDatetimeChange('datetimeEnd', value)}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>

						<TextField
							variant="outlined"
							name="numberAttempt"
							type="number"
							label="Số lần nộp cho phép"
							value={formData.numberAttempt}
							onChange={handleChange}
							required
							inputProps={{ min: 1 }}
						/>

						<TextField
							variant="outlined"
							name="timeAttempt"
							type="number"
							label="Thời gian làm bài (phút)"
							value={formData.timeAttempt}
							onChange={handleChange}
							required
							inputProps={{ min: 15, max: 200, step: 15 }}
						/>

						<Typography variant="h6" marginTop={'20px'}>
							Phương thức chấm điểm
						</Typography>
						<Select name="gradeMethod" label="Phương thức chấm điểm" value={formData.gradeMethod} onChange={handleChange} required>
							{listGradeMethod.map((option) => (
								<MenuItem key={option.name} value={option.gid}>
									{`${option.name} (${option.description})`}
								</MenuItem>
							))}
						</Select>

						<Typography variant="h5" marginTop={'20px'}>
							Danh sách câu hỏi
						</Typography>

						<Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px', backgroundColor: '#E7E0EA' }}>
							<ListQuestionsForm listQuestions={listQuestions} setListQuestions={setListQuestions} listCorrects={listCorrects} setListCorrects={setListCorrects} />
						</Box>
					</Box>

					<Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Thêm bài kiểm tra
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
