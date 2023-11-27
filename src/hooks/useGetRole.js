import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function useGetRole() {
	const userlocal = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [role, setRole] = useState(null);
	useEffect(() => {
		if (userlocal) {
			let token = `Bearer ${userlocal.token}`;
			const config = {
				headers: { Authorization: token },
			};

			axios
				.get('https://leetun2k2-001-site1.gtempurl.com/api/Authentication/GetRole', config)
				.then((response) => {
					if (response.data == 'STUDENT') {
						setRole('student');
					} else if (response.data == 'LECTURER') {
						setRole('lecturer');
					} else if (response.data == 'ADMIN') {
						setRole('interviewer');
					} else {
						setRole(null);
					}
				})
				.catch((error) => {
					console.log('error: ', error);
					dispatch({ type: 'saga/userLogout' });
				});
		} else {
			setRole(null);
		}
	}, [userlocal]);
	return role;
}

export default useGetRole;
