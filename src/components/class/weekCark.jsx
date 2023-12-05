import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function WeekCard(props) {
	const week = props.content;
	const navigate = useNavigate();
	console.log(week);

	const Lecture = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5" component="div" color={'blue'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài giảng</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						console.log('hehe');
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	const Exam = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5" component="div" color={'red'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài kiểm tra</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						console.log('hehe');
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	const Assessment = (props) => {
		return (
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5" component="div" color={'green'}>
						{props.topic.name}
					</Typography>
					<Typography color="text.secondary">Bài tập</Typography>
				</CardContent>
				<CardActions
					onClick={() => {
						console.log('hehe');
					}}
					sx={{ justifyContent: 'center' }}>
					<Button size="small">Vào xem</Button>
				</CardActions>
			</Card>
		);
	};

	return (
		<Box sx={{ minWidth: 1000, paddingTop: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Card variant="outlined" sx={{ backgroundColor: 'lavender' }}>
				<CardContent>
					<Typography variant="h3" color="text.secondary" gutterBottom>
						{week.key}
					</Typography>
					{week.topics &&
						week.topics.map((topic) => {
							if (topic.type === 'Lecture') {
								return <Lecture topic={topic} key={topic.name}></Lecture>;
							} else if (topic.type === 'Exam') {
								return <Exam topic={topic} key={topic.name}></Exam>;
							} else if (topic.type === 'Assessment') {
								return <Assessment topic={topic} key={topic.name}></Assessment>;
							}
						})}
				</CardContent>
			</Card>
		</Box>
	);
}
