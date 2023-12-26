import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

export const AddLectureTab = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: '',
		link: '',
		classSubject: params.get('subject'),
		content: '',
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
		setFormData((prevFormData) => ({
			...prevFormData,
			content: getHtml(),
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
		setShowConfirmationDialog(true);
	};

	const handleConfirm = () => {
		// Do something with the form data
		console.log(formData);
		setShowConfirmationDialog(false);

		axios
			.post(`/lecture/create`, formData)
			.then((response) => {
				if (response.status == 201) {
					let dataAdd2Topic = {
						type: 'Lecture',
						ID: response.data.lid,
						position: -1,
					};
					axios
						.put(`classSubject/addContentClassSubject/${params.get('subject')}`, dataAdd2Topic)
						.then((response1) => {
							if (response1.status == 200) {
								toast.success(`Đã tạo bài giảng ${response.data && response.data.title}`, {
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
							console.log(error);
						});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCancel = () => {
		setShowConfirmationDialog(false);
	};

	return (
		<>
			<Typography variant="h3" marginTop={'20px'}>
				Thêm bài giảng
			</Typography>
			<Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
						<TextField variant="standard" name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required={true} />
						<TextField variant="standard" name="link" label="Link" value={formData.link} onChange={handleChange} pattern="https?://.+" />
						<Typography variant="h5" marginTop={'20px'}>
							Nội dung
						</Typography>
						<Editor
							editorState={editorState}
							onEditorStateChange={handleEditorStateChange}
							editorStyle={{
								border: '1px solid #ccc',
								borderRadius: '4px',
								height: '400px',
								overflowY: 'scroll',
							}}
						/>
					</Box>
					<Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
						Thêm bài giảng
					</Button>
				</form>
			</Box>

			<Dialog open={showConfirmationDialog} onClose={handleCancel}>
				<DialogTitle>Xác nhận</DialogTitle>
				<DialogContent>
					<Typography variant="body1">
						Có chắc muốn thêm bài giảng này không? <br /> Nhớ check lại nội dung, sai chính tả là quê lắm á
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Khoan, để coi kỹ lại
					</Button>
					<Button onClick={() => handleConfirm()} color="secondary" variant="outlined" autoFocus>
						Rồi, thêm đi gái
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
