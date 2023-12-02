import { useState } from 'react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import './App.css';
import { Box } from '@material-ui/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Protected';

import Home from './pages/home/home';
import About from './pages/home/about';
import MainLayout from './layouts/main';
import Profile from './pages/account/profile';
import Login from './pages/auth/login';
import ListCourses from './pages/course/listCourses';
import CourseDetail from './pages/course/courseDetail';
import ListClasses from './pages/class/listClasses';
import ClassContent from './pages/class/classContent';

function App() {
	return (
		<Box>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{/* No autho */}
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="login" element={<Login />} />

						{/* student and teacher and admin */}
						<Route path="/" element={<ProtectedRoute allowed={['admin', 'teacher', 'student']} />}>
							<Route path="listCourses" element={<ListCourses />} />
							<Route path="course" element={<CourseDetail />} />
							<Route path="listClasses" element={<ListClasses />} />
							<Route path="class" element={<ClassContent />} />
							<Route path="account" element={<Profile />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
			;
		</Box>
	);
}

export default App;
