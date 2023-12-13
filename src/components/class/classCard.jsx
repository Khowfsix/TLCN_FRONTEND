import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

export default function CardClass(props) {
	const navigate = useNavigate();

	return (
		<Card sx={{ width: 300, maxWidth: 500 }}>
			<CardMedia sx={{ height: 140 }} image="https://source.unsplash.com/random" title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div" color={'black'}>
					{props.class && props.class.className}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					{props.course && props.course.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						navigate('/class?cid=' + props.class.cid);
					}}>
					Vào lớp
				</Button>
			</CardActions>
		</Card>
	);
}
