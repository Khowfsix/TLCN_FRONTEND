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
	const [studentInfo, setStudentInfo] = useState([]);
	const [listSubmit, setListSubmit] = useState([]);

	const fetchData = () => {
		axios
			.get(`studentJoinClass/getAll`)
			.then((response) => {
				if (response.status === 200 && response.data) {
					let data = response.data.filter((item) => item.classID === location.state.assessmentContent.classSubject.classID);
					setListStudent(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		axios.get(`student/getAll`).then((response) => {
			if (response.status === 200 && response.data) {
				setStudentInfo(response.data);
			}
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

	return (
		<Stack>
			<Typography variant="h4">Danh sách học viên nộp bài</Typography>
			<Box>
				<List>
					{listStudent.map((student, index) => (
						<Accordion key={student.sjcid} expanded={expanded === student.sjcid} onChange={handleChange(student.sjcid)}>
							<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
								{studentInfo.filter((info) => info.stid === student.studentID).length > 0 && (
									<Typography>{`${student.studentID} - ${studentInfo.filter((item) => item.stid === student.studentID)[0].name}`}</Typography>
								)}
							</AccordionSummary>
							{listSubmit.filter((item) => item.assessmentID === location.state.assessmentContent.aid && item.studentID === student.studentID).length > 0 ? (
								<AccordionDetails
									sx={{ display: 'flex', justifyContent: 'center' }}
									onClick={() => {
										navigate('/SubmitById', { state: { assessment: location.state.assessmentContent, studentid: student.studentID } });
									}}>
									Đã nộp bài
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
