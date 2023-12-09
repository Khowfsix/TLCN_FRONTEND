import { useState } from 'react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import './App.css';
import { Box } from '@material-ui/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Protected';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home/home';
import About from './pages/home/about';
import MainLayout from './layouts/main';
import Profile from './pages/account/profile';
import Login from './pages/auth/login';
import ListCourses from './pages/course/listCourses';
import CourseDetail from './pages/course/courseDetail';
import ListClasses from './pages/class/listClasses';
import ClassContent from './pages/class/classContent';
import Register from './pages/auth/register';

import Lecture from './pages/class/lecture/lecture';
import Assessment from './pages/class/assessment/assessment';
import Exam from './pages/class/exam/exam';
import AddSomething from './pages/class/addSomething';

import ListBlog from './pages/blog/listBlog';

function App() {
	localStorage.setItem('testing', false);

	return (
		<Box>
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{/* No autho */}
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="blogs" element={<ListBlog />} />

						{/* student and teacher and admin */}
						<Route path="/" element={<ProtectedRoute allowed={['admin', 'lecturer', 'student']} />}>
							<Route path="listCourses" element={<ListCourses />} />
							<Route path="course" element={<CourseDetail />} />
							<Route path="listClasses" element={<ListClasses />} />
							<Route path="class" element={<ClassContent />} />
							<Route path="account" element={<Profile />} />

							<Route path="lecture" element={<Lecture />} />
							<Route path="assessment" element={<Assessment />} />
							<Route path="exam" element={<Exam />} />
							<Route path="addSomething" element={<AddSomething />} />
						</Route>
						{/* admin and lecturer role */}
						<Route path="/" element={<ProtectedRoute allowed={['admin', 'lecturer']} />}></Route>

						{/* admin and student role */}
						<Route path="/" element={<ProtectedRoute allowed={['admin', 'student']} />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default App;
