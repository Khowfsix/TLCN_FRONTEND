import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../../apis/axiosConfig';
import { Box, Typography } from '@material-ui/core';

import formatedDateTime from '../../../utils/formatedDateTime';

export default function Lecture() {
	const [params] = useSearchParams();
	const [lectureContent, setLectureContent] = useState(null);

	useEffect(() => {
		// if (localStorage.getItem(`testing`) == false) {
		// 	axios
		// 		.request({
		// 			method: 'get',
		// 			url: `/lecture/getById/${params.get('lid')}`,
		// 		})
		// 		.then((response) => {
		// 			if (response.data) {
		// 				setLectureContent(response.data);
		// 				console.log(response.data);
		// 			}
		// 		})
		// 		.catch((error) => {
		// 			// Handle the error
		// 			console.error(error);
		// 		});
		// } else {
		setLectureContent({
			lid: 1,
			title: 'Exploring Quantum Mechanics',
			link: 'https://example.com/exploring-quantum-mechanics',
			datetimeUpload: '2023-12-10T08:00:00Z',
			datetimeTheLastUpdate: '2023-12-15T10:30:00Z',
			classSubject: 'Quantum Physics',
			content: `<p><b>Quantum mechanics, a fundamental theory in physics, revolutionized our understanding of the universe at the smallest scales. This lecture delves into the intriguing world of quantum phenomena, covering the principles of superposition, entanglement, and wave-particle duality.</b></p>
				<p>Starting with the pioneering experiments that led to the inception of quantum theory by Max Planck, Albert Einstein, Niels Bohr, and others, we explore the mathematics and conceptual framework behind this fascinating field. Discussions will touch upon Schrödinger's equation, Heisenberg's uncertainty principle, and the interpretation of quantum states.</p>
				<p>Furthermore, we'll examine the applications of quantum mechanics in modern technology, from quantum computing and cryptography to quantum teleportation and quantum entanglement's potential for secure communication.</p>
				<p>This lecture aims to provide a comprehensive overview, inviting both enthusiasts and students of physics to dive into the mesmerizing realm of quantum mechanics.</p>
				`,
		});
		// }
	}, []);

	console.log(lectureContent);

	return (
		<Box sx={{ justifyContent: 'center', alignItems: 'center', justifyItems: 'center', position: 'fixed' }}>
			<Typography variant="h3">{lectureContent && lectureContent.title}</Typography>

			<Typography variant="subtitle1">
				<b>Ngày đăng: </b>
				{lectureContent && formatedDateTime(lectureContent.datetimeUpload)}
			</Typography>
			<Typography variant="subtitle1">
				<b>
					<b>Ngày cập nhật: </b>
				</b>
				{lectureContent && formatedDateTime(lectureContent.datetimeTheLastUpdate)}
			</Typography>

			<Box sx={{}}>
				<div dangerouslySetInnerHTML={{ __html: lectureContent && lectureContent.content }} />
			</Box>
		</Box>
	);
}
