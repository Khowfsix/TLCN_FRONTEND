import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../../apis/axiosConfig';
import { Box, Button, Dialog, Typography } from '@material-ui/core';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

import { DeleteForeverOutlined } from '@material-ui/icons';
import { UpdateOutlined } from '@material-ui/icons';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import formatedDateTime from '../../../utils/formatedDateTime';
import Transition from '../../../utils/transition';

export default function Lecture() {
	const [params] = useSearchParams();
	const [lectureContent, setLectureContent] = useState(null);
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const [openDelDi, setOpenDelDi] = useState(false);
	const [openUpdDi, setOpenUpdDi] = useState(false);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleOpenDelDi = () => {
		setOpenDelDi(true);
	};

	const handleCloseDelDi = () => {
		setOpenDelDi(false);
	};

	const handleOpenUpdDi = () => {
		setOpenUpdDi(true);
	};

	const handleCloseUpdDi = () => {
		setOpenUpdDi(false);
	};

	useEffect(() => {
		if (localStorage.getItem(`testing`) != true) {
			axios
				.request({
					method: 'get',
					url: `/lecture/getById/${params.get('lid')}`,
				})
				.then((response) => {
					if (response.data) {
						setLectureContent(response.data);
						console.log(response.data);
					}
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});
		} else {
			setLectureContent({
				lid: 1,
				title: 'Exploring Quantum Mechanics',
				link: 'https://example.com/exploring-quantum-mechanics',
				datetimeUpload: '2023-12-10T08:00:00Z',
				datetimeTheLastUpdate: '2023-12-15T10:30:00Z',
				classSubject: 'Quantum Physics',
				content: `<p><b>Quantum mechanics, a fundamental theory in physics, revolutionized our understanding of the universe at the smallest scales. This lecture delves into the intriguing world of quantum phenomena, covering the principles of superposition, entanglement, and wave-particle duality.</b></p>
				<p>Starting with the pioneering experiments that led to the inception of quantum theory by Max Planck, Albert Einstein, Niels Bohr, and others, we explore the mathematics and conceptual framework behind this fascinating field. Discussions will touch upon Schrödinger's equation, Heisenberg's uncertainty principle, and the interpretation of quantum states.</p>
				<p>Furthermore, we'll examine the applications of quantum mechanics in modern technology, from quantum computing and cryptography to quantum teleportation and quantum entanglement's potential for secure communication.</p>
				<p>This lecture aims to provide a comprehensive overview, inviting both enthusiasts and students of physics to dive into the mesmerizing realm of quantum mechanics.</p>
				`,
			});
		}
	}, []);

	return (
		<Box sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', position: 'fixed' }}>
			<Box>
				<Typography variant="h3">{lectureContent && lectureContent.title}</Typography>

				<Typography variant="subtitle1">
					<b>Ngày đăng: </b>
					{lectureContent && formatedDateTime(lectureContent.datetimeUpload)}
				</Typography>
				<Typography variant="subtitle1">
					<b>
						<b>Ngày cập nhật: </b>
					</b>
					{lectureContent && formatedDateTime(lectureContent.datetimeTheLastUpdate)}
				</Typography>
				<Typography>
					<b>Link: </b>
					{lectureContent && lectureContent.link ? (
						<a href={lectureContent && lectureContent.link} target="_blank">
							{lectureContent && `Link đính kèm nè`}
						</a>
					) : (
						`Hông có link đính kèm`
					)}
				</Typography>
			</Box>

			<Box>
				<Typography variant="h5">Nội dung:</Typography>
				<div dangerouslySetInnerHTML={{ __html: lectureContent && lectureContent.content }} />
			</Box>

			<Stack direction="row" spacing={2}>
				<Button variant="outlined" startIcon={<DeleteForeverOutlined />} onClick={handleOpenDelDi}>
					Xóa bài giảng
				</Button>
				<Button variant="outlined" startIcon={<UpdateOutlined />} onClick={handleOpenUpdDi}>
					Chính sửa bài giảng
				</Button>
			</Stack>

			<Dialog
				open={openUpdDi}
				onClose={handleCloseUpdDi}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby="alert-dialog-slide-description"
				sx={{
					width: '80%', // Độ rộng của dialog
					maxWidth: 'lg', // Kích thước tối đa của dialog (lg: large, md: medium, etc.)
				}}>
				<DialogTitle>Cập nhật bài giảng</DialogTitle>
				<DialogContent>
					<DialogContentText></DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Tiêu đề"
						type="text"
						fullWidth
						defaultValue={lectureContent && lectureContent.title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="content"
						label="Nội dung"
						multiline
						rows={10}
						fullWidth
						variant="standard"
						defaultValue={lectureContent && lectureContent.content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseUpdDi}>Hủy</Button>
					<Button onClick={handleCloseUpdDi}>Lưu bản cập nhật</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openDelDi} onClose={handleCloseDelDi} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
				<DialogTitle>Xóa bài giảng</DialogTitle>
				<DialogContent>
					<DialogContentText>Chắc chưa bro :))) muốn xóa thật à</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelDi}>Thôi nghĩ lại rồi</Button>
					<Button onClick={handleCloseDelDi}>Yup, xóa đi</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
