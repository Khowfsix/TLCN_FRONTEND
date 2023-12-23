import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Box, Typography, TextField, Button, Dialog } from '@material-ui/core';

import { toast } from 'react-toastify';
import axios from '../../../apis/axiosConfig';

const SubmitAssessment = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [textValue, setTextValue] = useState('');
	const [link, setLink] = useState('');
	const [numAttempt, setNumAttempt] = useState(location.state.numAttempt);
	const [numRemain, setNumRemain] = useState(1);

	const fetchData = () => {
		axios
			.get(`studentAttemptAssessment/getByAssessmentID/${params.get('aid')}/${localStorage.getItem('roleUserId')}`)
			.then((response) => {
				if (response.data) {
					setNumRemain(numAttempt - response.data.length);
				}
			})
			.catch((err) => {
				// Handle the error
				console.error(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = {
			studentID: localStorage.getItem('roleUserId'),
			assessmentID: params.get('aid'),
			submition: [
				{
					type: 'content',
					value: textValue,
				},
				{
					type: 'link',
					value: link,
				},
			],
			grade: -1,
		};
		axios
			.post(`studentAttemptAssessment/create`, data)
			.then((response) => {
				if (response.status === 201) {
					toast.success(`Đã nộp bài tập`, {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: 'dark',
					});
					navigate(`/assessment?aid=${params.get('aid')}`);
				}
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	};

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
		setTextValue(getHtml());
	};

	return (
		<Box sx={{ textAlign: 'center', marginTop: 4 }}>
			<Typography variant="h4" gutterBottom>
				Nộp Bài Tập
			</Typography>
			<Typography variant="subtitle2" gutterBottom>
				<Typography variant="overline">Số lần được nộp: </Typography>
				{numAttempt}
			</Typography>
			<Typography variant="subtitle2" gutterBottom>
				<Typography variant="overline">Số lần nộp còn lại: </Typography>
				{numRemain}
			</Typography>
			{numRemain > 0 && (
				<form onSubmit={handleSubmit} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
					<TextField label="Link" value={link} onChange={(e) => setLink(e.target.value)} />

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
					<Button variant="contained" type="submit">
						Nộp Bài Tập
					</Button>
				</form>
			)}
		</Box>
	);
};

export default SubmitAssessment;
