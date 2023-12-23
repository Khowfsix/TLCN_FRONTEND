import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button } from '@mui/material';
import { Card, Checkbox, CardContent } from '@mui/material';
import { IconButton } from '@mui/material';
import { DeleteForever } from '@material-ui/icons';

import { v4 as uuid } from 'uuid';

const ListQuestionsForm = ({ listQuestions, listCorrects, setListQuestions, setListCorrects }) => {
	const handleAddQuestion = () => {
		let id = uuid();
		const defaultQuestion = {
			type: null,
			choices: ['', '', '', ''],
			content: '',
			questionId: id,
		};

		const defaultCorrect = {
			questionId: id,
			correct: [],
		};

		setListQuestions([...listQuestions, defaultQuestion]);
		setListCorrects([...listCorrects, defaultCorrect]);
	};

	const handleQuestionChange = (event, questionId, field) => {
		const updatedItems = listQuestions.map((item) => {
			if (item.questionId === questionId) {
				return { ...item, [field]: event.target.value };
			}
			return item;
		});
		setListQuestions(updatedItems);
	};

	const handleAnswerChange = (event, questionId, index) => {
		const updatedQuestions = listQuestions.map((question) => {
			if (question.questionId === questionId) {
				let updatedChoices = [...question.choices];
				updatedChoices[index] = event.target.value;
				return { ...question, choices: updatedChoices };
			}
			return question;
		});

		setListQuestions(updatedQuestions);
	};

	const handleCorrectChange = (event, questionId, answer) => {
		const isChecked = event.target.checked;

		if (isChecked) {
			const updatedCorrects = listCorrects.map((item) => {
				if (item.questionId === questionId) {
					return { ...item, correct: [...item.correct, answer] };
				}
				return item;
			});
			setListCorrects(updatedCorrects);
		} else {
			const updatedCorrects = listCorrects.map((item) => {
				if (item.questionId === questionId) {
					return { ...item, correct: item.correct.filter((ans) => ans !== answer) };
				}
				return item;
			});
			setListCorrects(updatedCorrects);
		}
	};

	const handleDeleteQuestion = (id) => {
		const removedQuestions = listQuestions.filter((item) => item.questionId !== id);
		const removedCorrects = listCorrects.filter((item) => item.questionId !== id);
		setListQuestions(removedQuestions);
		setListCorrects(removedCorrects);
	};

	return (
		<>
			{listQuestions.length > 0 &&
				listQuestions.map((question) => (
					<Box key={question.questionId} sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px', padding: '16px', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
						<form>
							<TextField
								label="Câu Hỏi"
								multiline
								value={question.content}
								onChange={(event) => handleQuestionChange(event, question.questionId, 'content')}
								variant="outlined"
								fullWidth
								margin="normal"
								required
							/>

							<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
								{question.choices &&
									question.choices.map((answer, index) => (
										<Card key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
											<Checkbox
												{...(listCorrects.find((item) => item.questionId === question.questionId) &&
												listCorrects.find((item) => item.questionId === question.questionId).correct.includes(answer)
													? { checked: true }
													: {})}
												onChange={(event) => handleCorrectChange(event, question.questionId, answer)}
											/>
											<CardContent sx={{ flexGrow: 1 }}>
												<TextField
													value={answer}
													onChange={(event) => handleAnswerChange(event, question.questionId, index)}
													variant="outlined"
													size="small"
													fullWidth
													required
												/>
											</CardContent>
										</Card>
									))}
							</Box>

							<IconButton aria-label="delete" onClick={() => handleDeleteQuestion(question.questionId)}>
								<DeleteForever />
							</IconButton>
						</form>
					</Box>
				))}

			<Button variant="contained" color="primary" sx={{ marginTop: '16px' }} onClick={() => handleAddQuestion()}>
				Thêm câu hỏi
			</Button>
		</>
	);
};

ListQuestionsForm.propsTypes = {
	listQuestions: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string,
			choices: PropTypes.arrayOf(PropTypes.string),
			content: PropTypes.string,
			questionId: PropTypes.string,
		}),
	).isRequired,
};

export default ListQuestionsForm;
