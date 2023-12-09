import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

	const [numberOfQuestions, setNumberOfQuestions] = useState(1);

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText('')));

	const handleEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
		setFormData((prevFormData) => ({
			...prevFormData,
			content: newEditorState.getCurrentContent().getPlainText(),
		}));
	};

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
							Nội dung
						</Typography>

						<Box sx={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
							<Editor
								placeholder="Nội dung câu hỏi"
								editorState={editorState}
								onEditorStateChange={handleEditorStateChange}
								editorStyle={{
									border: '1px solid #ccc',
									borderRadius: '4px',
									height: '100px',
									overflowY: 'scroll',
								}}
							/>

							<FormControl sx={{ marginTop: '20px', marginBottom: '20px' }}>
								<InputLabel id="question-type-label">Loại Câu Hỏi</InputLabel>
								<Select labelId="question-type-label" id="question-type-select" label="Loại Câu Hỏi">
									<MenuItem value="type1">Loại 1</MenuItem>
									<MenuItem value="type2">Loại 2</MenuItem>
									<MenuItem value="type3">Loại 3</MenuItem>
								</Select>
							</FormControl>

							<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
								<Box sx={{ flexGrow: 1, marginRight: '16px' }}>
									<TextField label="Câu Trả Lời" multiline rows={4} fullWidth />
								</Box>
								<Button variant="outlined" size="small">
									Thêm Câu Trả Lời
								</Button>
							</Box>
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
