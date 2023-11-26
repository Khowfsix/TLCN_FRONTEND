import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import MainLayout from '../layouts/main';

export const router = createBrowserRouter([
	{
		path: '',
		element: <MainLayout />,
		children: [
			{
				path: 'Home',
				element: <Home />,
			},
		],
	},
]);
