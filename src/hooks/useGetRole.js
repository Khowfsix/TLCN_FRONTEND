import { useState, useEffect } from 'react';
import axios from '../apis/axiosConfig';

function useGetRole() {
	// const userlocal = localStorage.getItem('userlocal');
	const [role, setRole] = useState(null);

	useEffect(() => {
		axios
			.post(`/auth/whoami`)
			.then((response) => {
				localStorage.setItem('userlocal', response.data);

				if (response.data.role == 'STUDENT') {
					setRole('student');
				} else if (response.data.role == 'TEACHER') {
					setRole('teacher');
				} else if (response.data.role == 'ADMIN') {
					setRole('admin');
				} else {
					setRole(null);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	});

	console.log(`My role is: ${role}`);
	localStorage.setItem('role', role);

	return role;
}

export default useGetRole;
