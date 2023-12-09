import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const AddAssessmentTab = () => {
	const [formData, setFormData] = useState({
		title: '',
		content: null,
		datetimeStart: null,
		datetimeEnd: null,
		datetimeCutoff: null,
		numberAttempt: null,
		classSubject: '',
	});

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
				Thêm bài tập
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
							<DateTimePicker
								name="datetimeCutOff"
								label="Thời gian cắt"
								value={formData.datetimeCutoff}
								onChange={(value) => handleDatetimeChange('datetimeCutoff', value)}
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

						<Typography variant="h5" marginTop={'20px'}>
							Nội dung
						</Typography>
						<TextField variant="standard" name="link" label="Link" value={formData.link} onChange={handleChange} required pattern="https?://.+" />
						<Editor
							editorState={editorState}
							onEditorStateChange={handleEditorStateChange}
							editorStyle={{
								border: '1px solid #ccc',
								borderRadius: '4px',
								height: '200px',
								overflowY: 'scroll',
							}}
						/>
					</Box>
					<Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Thêm bài tập
					</Button>
				</form>
			</Box>

			<Dialog open={showConfirmationDialog} onClose={handleCancel}>
				<DialogTitle>Xác nhận</DialogTitle>
				<DialogContent>
					<Typography variant="body1">
						Có chắc muốn thêm bài tập này không? Bạn có nghĩ là học viên có thể hoàn thành bài trong thời gian đó không <br /> Cho bài tập ít thôi, tội nghiệp tụi nhỏ :"))
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Khoan, để coi kỹ lại
					</Button>
					<Button onClick={handleConfirm} color="secondary" variant="outlined" autoFocus>
						Rồi biết rồi, thêm đi
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
