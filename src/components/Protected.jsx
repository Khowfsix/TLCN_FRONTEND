import React, { useEffect } from 'react';
import Unauthorized from './Unauthorized';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
	const { allowed } = props;
	const role = localStorage.getItem('role');
	const navigate = useNavigate();

	console.log(role);

	if (role && allowed.includes(role)) {
		return <Outlet />;
	}
	if (role == null) {
		useEffect(() => {
			navigate('/login');
		});
	}

	return <Unauthorized />;
};

export default ProtectedRoute;
