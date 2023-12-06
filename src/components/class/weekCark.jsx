import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, Grid } from '@material-ui/core';
import theme from './../../theme';

import DeleteSubjectDialog from '../../components/class/subject/deleteSubject';

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

	const handleUpdateSubject = (props) => {
		console.log(`update topic`);
	};

	const handleAddTopic = (props) => {
		console.log(`add topic`);
	};

	return (
		<Box sx={{ minWidth: 1000, paddingTop: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Card variant="outlined" sx={{ backgroundColor: 'lavenderblush' }}>
				<CardContent>
					<Typography variant="h3" color="text.secondary" gutterBottom>
						{week.key}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
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
						</Grid>
						<Grid item></Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<ButtonGroup color="secondary" aria-label="medium secondary button group">
						<ButtonGroup color="primary" aria-label="small secondary button group">
							<Button onClick={() => handleAddTopic(props)}>Thêm nội dung</Button>
							<Button onClick={() => handleUpdateSubject(props)}>Chỉnh sửa</Button>
							<Button>Xóa chủ để</Button>
						</ButtonGroup>
					</ButtonGroup>
				</CardActions>
			</Card>

			<DeleteSubjectDialog></DeleteSubjectDialog>
		</Box>
	);
}
