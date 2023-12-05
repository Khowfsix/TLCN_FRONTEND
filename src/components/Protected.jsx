import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Unauthorized from './Unauthorized';
import useGetRole from '../hooks/useGetRole';

const ProtectedRoute = (props) => {
	const allowed = props.allowed;
	const Iam = useGetRole();
	// const [role, setRole] = useState(null);
	const navigate = useNavigate();

	if (Iam == null) {
		useEffect(() => {
			navigate('/login');
		}, [Iam, navigate]);
		return null;
	}

	if (allowed.includes(Iam[1])) {
		return <Outlet />;
	}

	return <Unauthorized />;
};

export default ProtectedRoute;
