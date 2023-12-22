import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

import moment from 'moment';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

export const AddAssessmentTab = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [link, setLink] = useState(null);
	const [content, setContent] = useState(null);

	const [formData, setFormData] = useState({
		title: '',
		content: null,
		datetimeStart: null,
		datetimeEnd: null,
		datetimeCutoff: null,
		numberAttempt: 1,
		classSubject: params.get('subject'),
	});

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText('')));

	const getHtml = () => {
		const contentState = editorState.getCurrentContent();
		const rawContentState = convertToRaw(contentState);
		let html = draftToHtml(rawContentState);
		html = html.replace(/\n/g, '');
		return html;
	};

	const handleEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
		setContent(getHtml());
	};

	const handleChange = (event) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[event.target.name]: event.target.value,
		}));
	};

	const handleChange_1 = (event) => {
		setLink(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowConfirmationDialog(true);

		setFormData((prevFormData) => ({
			...prevFormData,
			numberAttempt: Number(prevFormData.numberAttempt),
			content: [
				{ type: 'link', value: link },
				{ type: 'content', value: content },
			],
		}));
	};

	const handleConfirm = () => {
		// Do something with the form data
		setShowConfirmationDialog(false);

		axios
			.post(`/assessment/create`, formData)
			.then((response) => {
				if (response.status === 201) {
					let data = {
						type: 'Assessment',
						ID: response.data.aid,
						position: -1,
					};
					axios
						.put(`classSubject/addContentClassSubject/${response.data.classSubject}`, data)
						.then((response1) => {
							if (response1.status === 200) {
								toast.success(`Đã tạo bài tập ${response.data && response.data.title}`, {
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
								referenceDate={moment().toDate()}
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
						<TextField variant="standard" name="link" label="Link" value={link} onChange={handleChange_1} pattern="https?://.+" />
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
