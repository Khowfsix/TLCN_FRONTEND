import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import About from '../pages/home/about';
import MainLayout from '../layouts/main';
import Profile from '../pages/account/profile';
import Login from '../pages/auth/login';
import ListCourses from '../pages/course/listCourses';
import CourseDetail from '../pages/course/courseDetail';
import ListClasses from '../pages/class/student/listClassesbyStudent';
import ClassContent from '../pages/class/classContent';

const token = localStorage.getItem('accessToken');

export const publicRouter = createBrowserRouter([
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
				path: 'about',
				element: <About />,
			},

			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

export const privateRouter = createBrowserRouter([
	{
		path: 'listCourses',
		element: <ListCourses />,
	},
	{
		path: 'course',
		element: <CourseDetail />,
	},
	{
		path: 'listClasses',
		element: <ListClasses />,
	},
	{
		path: 'class',
		element: <ClassContent />,
	},
	{
		path: 'account',
		element: <Profile />,
	},
]);
