import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Label } from '@mui/icons-material';

export const AddLectureTab = () => {
	const [formData, setFormData] = useState({
		title: '',
		link: '',
		classSubject: '',
		content: '',
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

	return (
		<>
			<Typography variant="h3" marginTop={'20px'}>
				Thêm bài giảng
			</Typography>
			<Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
						<TextField variant="standard" name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required />
						<TextField variant="standard" name="link" label="Link" value={formData.link} onChange={handleChange} required pattern="https?://.+" />
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
					<Button onClick={handleConfirm} color="secondary" variant="outlined" autoFocus>
						Rồi, thêm đi gái
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
