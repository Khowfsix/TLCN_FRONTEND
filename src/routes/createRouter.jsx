import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/Protected';

import Home from '../pages/home/home';
import About from '../pages/home/about';
import MainLayout from '../layouts/main';
import Profile from '../pages/account/profile';
import Login from '../pages/auth/login';
import ListCourses from '../pages/course/listCourses';
import CourseDetail from '../pages/course/courseDetail';
import ListClasses from '../pages/class/student/listClassesbyStudent';
import ClassContent from '../pages/class/classContent';

export const router = createBrowserRouter([
	{
		id: 'public',
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
				path: 'about',
				element: <About />,
			},

			{
				path: 'login',
				element: <Login />,
			},
		],
	},
	{
		id: 'protected',
		path: '',
		element: <MainLayout />,
		children: [
			{
				path: 'listCourses',
				element: (
					<ProtectedRoute allowed={['admin', 'teacher', 'student']}>
						<ListCourses />
					</ProtectedRoute>
				),
			},
			{
				path: 'course',
				element: (
					<ProtectedRoute allowed={['admin', 'teacher', 'student']}>
						<CourseDetail />
					</ProtectedRoute>
				),
			},
			{
				path: 'listClasses',
				element: (
					<ProtectedRoute allowed={['admin', 'teacher', 'student']}>
						<ListClasses />
					</ProtectedRoute>
				),
			},
			{
				path: 'class',
				element: (
					<ProtectedRoute allowed={['admin', 'teacher', 'student']}>
						<ClassContent />
					</ProtectedRoute>
				),
			},
			{
				path: 'account',
				element: (
					<ProtectedRoute allowed={['admin', 'teacher', 'student']}>
						<Profile />
					</ProtectedRoute>
				),
			},
		],
	},
]);
