import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Box, Stack } from '@mui/material';

import axios from '../../../apis/axiosConfig';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />)(({ theme }) => ({
	backgroundColor: 'rgba(255, 255, 255, .05)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ListStudentSubmit = () => {
	const [params] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const [expanded, setExpanded] = useState(null);
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const [listStudent, setListStudent] = useState([]);
	// const [studentInfo, setStudentInfo] = useState([]);
	const [listSubmit, setListSubmit] = useState([]);

	const fetchData = () => {
		axios
			.get(`class/getAllParticipantsByClassId/${location.state.assessmentContent.classSubject.classID}`)
			.then((response) => {
				if (response.status === 200 && response.data) {
					setListStudent(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		axios.get(`studentAttemptAssessment/getByAssessmentID/${location.state.assessmentContent.aid}`).then((response) => {
			if (response.status === 200 && response.data) {
				setListSubmit(response.data);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, [params]);

	console.log(listStudent);

	return (
		<Stack>
			<Typography variant="h4">Danh sách học viên nộp bài</Typography>
			<Box>
				<List>
					{listStudent.map((student, index) => (
						<Accordion key={student.id} expanded={expanded === student.id} onChange={handleChange(student.id)}>
							<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
								<Typography>{`${student.id} - ${student.name}`}</Typography>
							</AccordionSummary>
							{listSubmit.filter((item) => item.assessmentID === location.state.assessmentContent.aid && item.studentID === student.id).length > 0 ? (
								<AccordionDetails sx={{ display: 'flex', justifyContent: 'center' }}>
									{listSubmit
										.filter((item) => item.assessmentID === location.state.assessmentContent.aid && item.studentID === student.id)
										.map((item) => {
											return (
												<ListItem key={item.saaid}>
													<ListItemText
														onClick={() => {
															if (item.grade == -1) {
																navigate(`/SubmitById?studentId=${student.id}&assessmentId=${location.state.assessmentContent.aid}&submissionId=${item.saaid}`);
															}
														}}>
														ID: {item.saaid} - Grade: {item.grade}
													</ListItemText>
												</ListItem>
											);
										})}
								</AccordionDetails>
							) : (
								<AccordionDetails>Chưa nộp bài</AccordionDetails>
							)}
						</Accordion>
					))}
				</List>
			</Box>
		</Stack>
	);
};

export default ListStudentSubmit;
