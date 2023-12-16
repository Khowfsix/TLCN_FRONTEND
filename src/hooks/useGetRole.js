import { useState, useEffect } from 'react';
import axios from '../apis/axiosConfig';

function useGetRole() {
	const [userId, setUserId] = useState(localStorage.getItem('userId'));
	const [role, setRole] = useState(localStorage.getItem('role'));
	const [roleUserId, setRoleUserId] = useState(localStorage.getItem('roleUserId'));

	const token = localStorage.getItem('accessToken');

	// Chưa có token thì là chưa đăng nhập
	if (token == null) {
		return null;
	}

	useEffect(() => {
		if (Date.parse(localStorage.getItem('exp')) < Date.now()) {
			// token hết hạn
			localStorage.removeItem('accessToken');
			localStorage.removeItem('exp');
			localStorage.removeItem('role');
			localStorage.removeItem('roleUserId');
			localStorage.removeItem('userId');
		}

		if (userId == 'null') {
			axios
				.post(`/auth/whoami`)
				.then((response) => {
					setUserId(response.data.sub != -1 ? response.data.sub : null);
					setRole(response.data.role ? response.data.role.toLowerCase() : null);

					if (response.data.role === 'STUDENT') {
						setRoleUserId(response.data.object.stid);
					} else if (response.data.role === 'LECTURER') {
						setRoleUserId(response.data.object.lid);
					}

					localStorage.setItem('exp', response.data.exp ? response.data.exp : null);
				})
				.catch((error) => {
					console.log('error: ', error);
				});
		}
	}, [token]);

	localStorage.setItem('userId', userId);
	localStorage.setItem('role', role);
	localStorage.setItem('roleUserId', roleUserId);
	return [userId, role, roleUserId];
}

export default useGetRole;
