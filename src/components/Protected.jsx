import React, { useEffect } from 'react';
import useGetRole from '../hooks/useGetRole';
import Unauthorized from './Unauthorized';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
	const { allowed } = props;
	const role = useGetRole();
	const navigate = useNavigate();

	if (role == null) {
		useEffect(() => {
			navigate(`/login`);
		}, []);
	} else if (role && allowed.includes(role)) {
		return <Outlet />;
	} else {
		return <Unauthorized />;
	}
};

export default ProtectedRoute;
