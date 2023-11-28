import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import MainLayout from '../layouts/main';

import Profile from '../pages/account/profile';
import Login from '../pages/auth/login';
import ListCourses from '../pages/course/listCourses';
import CourseDetail from '../pages/course/courseDetail';

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
			{
				path: 'listCourses',
				element: <ListCourses />,
			},
			{
				path: 'courseDetail',
				element: <CourseDetail />,
			},
		],
	},
]);
