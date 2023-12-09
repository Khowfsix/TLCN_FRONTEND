import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Card, Checkbox, CardContent } from '@mui/material';
import { IconButton } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';

const NewQuestionForm = (props) => {
	const [question, setQuestion] = useState(props.question);
	const [answers, setAnswers] = useState(props.answers);
	const [correctAnswer, setCorrectAnswer] = useState(props.correctAnswer);

	const handleQuestionChange = (event) => {
		setQuestion(event.target.value);
	};

	const handleAnswerChange = (event, index) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index] = event.target.value;
		setAnswers(updatedAnswers);
	};

	const handleCorrectAnswerChange = (event) => {
		setCorrectAnswer(event.target.value);
	};

	const handleAddAnswer = () => {
		setAnswers([...answers, '']);
	};

	const handleDeleteAnswer = (index) => {
		const updatedAnswers = [...answers];
		updatedAnswers.splice(index, 1);
		setAnswers(updatedAnswers);
	};

	return (
		<form>
			<TextField label="Câu Hỏi" multiline value={question} onChange={handleQuestionChange} variant="outlined" fullWidth margin="normal" />
			<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
				{answers.map((answer, index) => (
					<Card key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
						<Checkbox checked={answer.isCorrect} onChange={() => handleCorrectAnswerChange(index)} />
						<CardContent sx={{ flexGrow: 1 }}>
							<TextField value={answer.text} onChange={(event) => handleAnswerChange(event, index)} variant="outlined" size="small" fullWidth />
						</CardContent>
						<IconButton onClick={() => handleDeleteAnswer(index)}>
							<DeleteSweep />
						</IconButton>
					</Card>
				))}
			</Box>

			<Button variant="outlined" size="small" onClick={handleAddAnswer}>
				Thêm Câu Trả Lời
			</Button>
		</form>
	);
};

export default NewQuestionForm;
