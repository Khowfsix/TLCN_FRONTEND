import React from 'react';
import { Typography, Avatar, Grid, Card, CardContent } from '@mui/material';

export default function About() {
	const projectDescription = 'Mô tả dự án: [Thêm mô tả dự án ở đây]';
	const courseInfo = 'Thông tin môn: [Thêm thông tin môn ở đây]';
	const instructor = 'Giảng viên hướng dẫn: [Tên giảng viên]';
	const students = [
		{ name: 'Sinh viên 1', avatar: '/path/to/avatar1.png' },
		{ name: 'Sinh viên 2', avatar: '/path/to/avatar2.png' },
	];

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Thông tin nhóm dự án
			</Typography>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6">Mô tả dự án:</Typography>
					<Typography>{projectDescription}</Typography>
					<Typography variant="h6">Thông tin môn:</Typography>
					<Typography>{courseInfo}</Typography>
					<Typography variant="h6">Giảng viên hướng dẫn:</Typography>
					<Typography>{instructor}</Typography>
					<Typography variant="h6">Sinh viên:</Typography>
					<Grid container spacing={2}>
						{students.map((student, index) => (
							<Grid item key={index}>
								<Avatar alt={student.name} src={student.avatar} />
								<Typography>{student.name}</Typography>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
}
