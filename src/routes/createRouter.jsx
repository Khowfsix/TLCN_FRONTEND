import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import MainLayout from '../layouts/main';

import Profile from '../pages/account/profile';
import Login from '../pages/auth/login';

export const router = createBrowserRouter([
	{
		path: '',
		element: <MainLayout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'account',
				element: <Profile />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);
