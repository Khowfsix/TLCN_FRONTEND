import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';

import NewQuestionForm from './newQuestionForm.component';

export const AddExamTab = () => {
	const [formData, setFormData] = useState({
		title: '',
		question: null,
		correct: null,
		datetimeStart: null,
		datetimeEnd: null,
		numberAttempt: null,
		classSubject: '',
		timeAttempt: null,
	});

	const [listQuestions, setListQuestions] = useState([]);
	const defaultQuestion = {
		question: '',
		answers: ['', '', '', ''],
		correctAnswer: [''],
	};

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const handleChange = (event) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
		setShowConfirmationDialog(true);
	};

	const handleConfirm = () => {
		// Do something with the form data
		console.log(formData);
		setShowConfirmationDialog(false);
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

	const handleAddAnswer = () => {
		setListQuestions([...listQuestions, defaultQuestion]);
		console.log(listQuestions);
	};

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

						<Typography variant="h5" marginTop={'20px'}>
							Danh sách câu hỏi
						</Typography>

						<Button variant="contained" onClick={handleAddAnswer}>
							Thêm câu hỏi
						</Button>

						<Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
							{listQuestions.map((question) => {
								return <NewQuestionForm question={question} />;
							})}
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
