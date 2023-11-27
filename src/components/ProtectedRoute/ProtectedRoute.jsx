import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetRole from '../../hooks/useGetRole';
import Unauthorized from '../Unauthorized/Unauthorized';

const ProtectedRoute = (props) => {
	const { allowed } = props;
	const location = useLocation();
	const role = useGetRole();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	if (user) {
		if (allowed.includes(role)) {
			return <Outlet />;
		} else if (role) {
			// navigate("/unauthorized")
			return (
				<Unauthorized />
				// <Navigate to="/unauthorized" state={{ from: location }} replace/>
			);
		}
		// else {
		//     return (
		//         <Missing />
		//     )
		// }
	} else {
		// navigate("/unauthorized")
		return (
			<Unauthorized />
			// <Navigate to="/unauthorized" state={{ from: location }} replace/>
		);
	}
};

export default ProtectedRoute;
