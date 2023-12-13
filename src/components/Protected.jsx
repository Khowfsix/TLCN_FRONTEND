import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Unauthorized from './Unauthorized';
import useGetRole from '../hooks/useGetRole';

/**
 * Renders a protected route based on the user's role.
 *
 * @param {object} props - The props object containing the allowed roles and navigate function.
 * @return {JSX.Element} - The rendered protected route component.
 */
const ProtectedRoute = (props) => {
	const allowed = props.allowed;
	const navigate = useNavigate();

	const Iam = useGetRole();

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
