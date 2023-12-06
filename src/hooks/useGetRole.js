import { useState, useEffect } from 'react';
import axios from '../apis/axiosConfig';

function useGetRole() {
	const [userId, setUserId] = useState(null);
	const [role, setRole] = useState(null);
	const [roleUserId, setRoleUserId] = useState(null);

	const token = localStorage.getItem('accessToken');

	// Chưa có token thì là chưa đăng nhập
	if (token == null) {
		return null;
	}

	useEffect(() => {
		axios
			.post(`/auth/whoami`)
			.then((response) => {
				setUserId(response.data.sub);
				setRole(response.data.role);

				if (response.data.sub == -1) {
					return null;
				}

				if (response.data.role == 'STUDENT') {
					setRole('student');
					setRoleUserId(response.data.object.stid);
				} else if (response.data.role == 'LECTURER') {
					setRole('lecturer');
					setRoleUserId(response.data.object.lid);
				} else if (response.data.role == 'ADMIN') {
					setRole('admin');
				} else {
					// Token hết hạn
					setRole(null);
				}
			})
			.catch((error) => {
				console.log('error: ', error);
			});
	});

	localStorage.setItem('userId', userId);
	localStorage.setItem('role', role);
	localStorage.setItem('roleUserId', roleUserId);

	return [userId, role, roleUserId];
}

export default useGetRole;
