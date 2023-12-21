import React, { useState } from 'react';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

const EditLecture = (props) => {
	const [formData, setFormData] = useState({
		title: props.initLecture.title,
		link: props.initLecture.link,
		classSubject: props.initLecture.classSubject,
		content: props.initLecture.content,
	});

	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
	const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText(formData && formData.content)));

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
			.put(`lecture/update/${props.initLecture.lid}`, formData)
			.then((response) => {
				if (response.status == 201) {
					toast.success('Bài giảng đã được cập nhật thành công', {
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
	};

	const handleCancel = () => {
		setShowConfirmationDialog(false);
	};

	return (
		<>
			<Typography variant="h3" marginTop={'20px'}>
				Chỉnh sửa bài giảng
			</Typography>
			<Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
						<TextField variant="standard" name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required />
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
						Lưu bài giảng
					</Button>
				</form>
			</Box>

			<Dialog open={showConfirmationDialog} onClose={handleCancel}>
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
		</>
	);
};

export default EditLecture;
