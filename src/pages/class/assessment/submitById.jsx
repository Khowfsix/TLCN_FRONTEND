import React from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const SubmitById = () => {
	const { studentId } = useParams();
	const student = students.find((student) => student.id === parseInt(studentId));

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Danh sách bài nộp của {student.name}
			</Typography>
			<List>
				{student.submissions.map((submission, index) => (
					<ListItem key={index}>
						<ListItemText primary={submission} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default SubmitById;
