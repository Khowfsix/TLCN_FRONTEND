import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardCourse from '../../components/course/cardCourse';

function listCourses() {
	const [coursesList, setCourseList] = useState([]);

	useEffect(() => {
		async function getListCourses() {
			try {
				const request = 'http://127.0.0.1:5000/api/course/getAll';
				const response = await fetch(request);
				const dataJson = await response.json();

				// console.log(dataJson);
				setCourseList(dataJson);
			} catch (error) {
				console.log(error.message);
			}
		}

		getListCourses();
	}, []);

	return (
		<div>
			<ul>
				{coursesList.map((course) => (
					<li key={course.cid}>
						<CardCourse course={course}></CardCourse>
					</li>
				))}
			</ul>
		</div>
	);
}

export default listCourses;
