import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import axios from '../apis/axiosConfig';

function useGetRole() {
	const accessToken = localStorage.getItem('accessToken');
	const [role, setRole] = useState(null);

	useEffect(() => {
		// if (userlocal) {
		axios
			.get(`/authgetRoleByToken/${accessToken}`)
			.then((response) => {
				if (response.data.role == 'student') {
					setRole('student');
				} else if (response.data.role == 'teacher') {
					setRole('teacher');
				} else if (response.data.role == 'admin') {
					setRole('admin');
				} else {
					setRole(null);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
		// } else {
		// 	setRole(null);
		// }
	});

	console.log(`My role is: ${role}`);
	return role;
}

export default useGetRole;
