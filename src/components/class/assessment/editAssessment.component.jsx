import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

// import moment from 'moment';

import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';
import Transition from '../../../utils/transition';

const EditAssessment = (props) => {
	const [formData, setFormData] = useState({
		aid: props.initData.aid,
		title: props.initData.title,
		content: props.initData.content,
		datetimeStart: null,
		datetimeEnd: null,
		datetimeCutoff: null,
		numberAttempt: props.initData.numberAttempt,
		classSubject: props.initData.classSubject,
		isHidden: false,
		isDeleted: false,
	});

	const [link, setLink] = useState(formData.content ? formData.content.filter((item) => item.type === 'link')[0].value : null);
	const [content, setContent] = useState(formData.content ? formData.content.filter((item) => item.type === 'content')[0].value : null);

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
	//get editor state from html
	const blocksFromHTML = convertFromHTML(content);
	const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)));

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
			content: [
				{
					type: 'link',
					value: link,
				},
				{ type: 'content', value: getHtml() },
			],
		}));
	};

	const handleChange_1 = (event) => {
		setLink(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowConfirmationDialog(true);
	};

	const checkValidTime = () => {
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
		if (formData.datetimeCutoff > formData.datetimeEnd) {
			toast.error('Thời gian thu bài phải trước thời gian kết thúc', {
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

		if (formData.datetimeCutoff < formData.datetimeStart) {
			toast.error('Thời gian thu bài phải sau thời gian bắt đầu', {
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
		return true;
	};

	const handleConfirm = () => {
		// Do something with the form data
		console.log(formData);
		setShowConfirmationDialog(false);
		if (checkValidTime()) {
			axios
				.put(`assessment/update/${props.initData.aid}`, formData)
				.then((response) => {
					if (response.status == 201) {
						toast.success('Bài tập đã được cập nhật thành công', {
							position: 'top-right',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							theme: 'dark',
						});
						props.fetchData();
						props.close();
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

	return (
		<Box sx={{ marginTop: '20px' }}>
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
						Lưu bài tập
					</Button>
				</form>
			</Box>

			<Dialog open={showConfirmationDialog} onClose={handleCancel} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xác nhận</DialogTitle>
				<DialogContent>
					<Typography variant="body1">Nhớ check lại nội dung, sai chính tả là quê lắm á</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Khoan, để coi kỹ lại
					</Button>
					<Button onClick={handleConfirm} color="secondary" variant="outlined" autoFocus>
						Rồi, chỉnh đi gái
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default EditAssessment;
