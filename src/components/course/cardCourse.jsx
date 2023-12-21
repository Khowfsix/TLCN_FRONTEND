import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

const CardCourse = React.memo((props) => {
	const navigate = useNavigate();

	return (
		<Card sx={{ width: 400, maxWidth: 500 }}>
			<CardMedia sx={{ height: 140 }} image="https://source.unsplash.com/random" title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div" color={'black'}>
					{props.course.courseName}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						navigate('/course?cid=' + props.course.cid);
					}}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
});

export default CardCourse;
