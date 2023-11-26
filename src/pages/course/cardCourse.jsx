import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function cardCourse(props) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 140 }} image={props.img} title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{props.courseName}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{props.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Add to card</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}
