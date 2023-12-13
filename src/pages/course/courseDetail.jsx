import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../apis/axiosConfig';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

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

const lorem = `Lorem ipsum dolor sit amet. Ex itaque laboriosam vel vitae molestiae aut quibusdam voluptas. Qui excepturi dolorem aut facere voluptates id odio commodi in nihil galisum ad soluta asperiores qui illo rerum et omnis assumenda. Ut enim omnis vel repudiandae laboriosam qui minima porro ut consequatur obcaecati eum sunt enim nam quisquam fugit eum corporis ipsum. Et facere commodi est molestiae obcaecati id omnis suscipit qui placeat perferendis vel quidem provident ut fugiat repudiandae hic optio velit.
Est nihil fugiat et odio dolor vel aliquid excepturi. Et animi delectus qui magnam tempora id consequatur dolores aut accusamus quasi aut quibusdam ipsum id quae enim. Est voluptatem placeat qui omnis eius nam consequatur omnis ea veniam tenetur nam quia deserunt id accusamus explicabo?
Qui cumque iure qui voluptates reiciendis vel atque sequi aut praesentium accusamus in quod accusamus aut voluptatem sunt. Aut obcaecati eveniet eum distinctio molestias et laboriosam optio non exercitationem labore est omnis ipsam. Sed eaque adipisci est officia velit est labore nemo qui molestias sapiente ab aperiam doloribus. Est mollitia saepe est enim quod ea architecto veritatis qui tempora dolores?`;

export default function CourseDetail() {
	const [detail, setDetail] = useState(null);
	const [classList, setClassList] = useState([]);
	const [params] = useSearchParams();
	const [expanded, setExpanded] = useState(null);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleExpandClass = (classId) => {
		if (expandedClassId === classId) {
			setExpandedClassId(null);
		} else {
			setExpandedClassId(classId);
		}
	};

	useEffect(() => {
		axios
			.get(`/course/getById/${params.get('cid')}`)
			.then((response) => {
				setDetail(response.data);
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});

		axios
			.get(`/class/getClassByCourseID/${params.get('cid')}`)
			.then((response) => {
				setClassList(response.data);
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	}, [params]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
			<Box>
				<Typography variant="h4" component="h1">
					Thông tin khóa học
				</Typography>
				{/* Hiển thị thông tin về khóa học */}
				<Typography variant="body1" sx={{ textAlign: 'left' }}>
					<b>Mã khóa học: </b> {detail && detail.cid}
				</Typography>
				<Typography variant="body1" sx={{ textAlign: 'left' }}>
					<b>Loại khóa học: </b> {detail && detail.category}
				</Typography>
				<Typography variant="body1" sx={{ textAlign: 'left' }}>
					{detail ? detail.description : lorem}
				</Typography>
			</Box>

			<Typography variant="h5" component="h2">
				Danh sách lớp học
			</Typography>
			{classList &&
				classList.map((classs) => {
					if (classs.isDeleted === false) {
						return (
							<Accordion key={classs.cid} expanded={expanded === classs.cid} onChange={handleChange(classs.cid)}>
								<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
									<Typography>{classs.className}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant="body1">
										<b>Thời gian bắt đầu: </b> {classs.dateStart}
									</Typography>
									<Typography variant="body1">
										<b>Thời gian kết thúc: </b> {classs.dateEnd}
									</Typography>
									<Typography sx={{ textAlign: 'left' }}>{classs.description.length > 0 ? classs.description : lorem}</Typography>
								</AccordionDetails>
							</Accordion>
						);
					}
				})}
		</Box>
	);
}
