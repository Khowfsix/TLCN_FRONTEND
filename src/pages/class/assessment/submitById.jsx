import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const SubmitById = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const { assessment, studentid } = location.state;
	const [listSubmit, setListSubmit] = useState([]);
	// const

	return (
		<>
			<Typography variant="h4">Danh sách các bài nộp của học viên - {studentid}</Typography>
			<List>
				{assessment.map((item) => (
					<ListItem key={item.aid} onClick={() => navigate(`/class/assessment/submit/${studentid}/${item.aid}`)}>
						<ListItemText primary={item.title} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default SubmitById;
