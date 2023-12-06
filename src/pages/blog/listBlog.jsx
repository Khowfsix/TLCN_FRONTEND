import React, { lazy, useEffect, useState } from 'react';
import axios from '../../apis/axiosConfig';
import { Box } from '@material-ui/core';

import BlogCard from './../../components/blog/blogCard';

export default function ListBlog() {
	const [listBlogs, setListBlogs] = useState([]);
	// get list Blog

	useEffect(() => {
		axios
			.get('/blog/getAll')
			.then((response) => {
				// console.log(response.data);
				// if (response.status === 200 && response.data) {
				// 	setListBlogs(response.data);
				// }
			})
			.catch((error) => {
				// Handle the error
				console.error(error);
			});
	}, listBlogs);

	useEffect(() => {
		// testing
		if (localStorage.getItem('testing')) {
			setListBlogs([
				{
					bid: 1,
					title: 'Sample Title 1',
					content: 'Sample Content 1',
					datetimeCreated: '2023-12-06T08:00:00Z',
					contentPreCurrentUpdate: 'Previous content before update 1',
					datetimeCurrentUpdate: '2023-12-06T10:30:00Z',
					blogStatus: 1,
					blogOwner: 123456789,
					isBlocked: 0,
					priority: 1,
					isDeleted: 0,
				},
				{
					bid: 2,
					title: 'Sample Title 2',
					content: 'Sample Content 2',
					datetimeCreated: '2023-12-07T09:15:00Z',
					contentPreCurrentUpdate: 'Previous content before update 2',
					datetimeCurrentUpdate: '2023-12-07T11:45:00Z',
					blogStatus: 2,
					blogOwner: 987654321,
					isBlocked: 1,
					priority: 2,
					isDeleted: 0,
				},
				{
					bid: 3,
					title: 'Sample Title 3',
					content: 'Sample Content 3',
					datetimeCreated: '2023-12-08T10:00:00Z',
					contentPreCurrentUpdate: 'Previous content before update 3',
					datetimeCurrentUpdate: '2023-12-08T12:30:00Z',
					blogStatus: 1,
					blogOwner: 135792468,
					isBlocked: 0,
					priority: 1,
					isDeleted: 1,
				},
				{
					bid: 4,
					title: 'Sample Title 4',
					content: 'Sample Content 4',
					datetimeCreated: '2023-12-09T11:30:00Z',
					contentPreCurrentUpdate: 'Previous content before update 4',
					datetimeCurrentUpdate: '2023-12-09T14:00:00Z',
					blogStatus: 2,
					blogOwner: 246813579,
					isBlocked: 1,
					priority: 2,
					isDeleted: 0,
				},
				{
					bid: 5,
					title: 'Sample Title 5',
					content: 'Sample Content 5',
					datetimeCreated: '2023-12-10T12:45:00Z',
					contentPreCurrentUpdate: 'Previous content before update 5',
					datetimeCurrentUpdate: '2023-12-10T15:15:00Z',
					blogStatus: 1,
					blogOwner: 987654321,
					isBlocked: 0,
					priority: 1,
					isDeleted: 0,
				},
				{
					bid: 6,
					title: 'Sample Title 6',
					content: 'Sample Content 6',
					datetimeCreated: '2023-12-11T09:00:00Z',
					contentPreCurrentUpdate: 'Previous content before update 6',
					datetimeCurrentUpdate: '2023-12-11T11:30:00Z',
					blogStatus: 2,
					blogOwner: 246813579,
					isBlocked: 1,
					priority: 2,
					isDeleted: 1,
				},
				{
					bid: 7,
					title: 'Sample Title 7',
					content: 'Sample Content 7',
					datetimeCreated: '2023-12-12T10:15:00Z',
					contentPreCurrentUpdate: 'Previous content before update 7',
					datetimeCurrentUpdate: '2023-12-12T13:45:00Z',
					blogStatus: 1,
					blogOwner: 987654321,
					isBlocked: 0,
					priority: 1,
					isDeleted: 0,
				},
				{
					bid: 8,
					title: 'Sample Title 8',
					content: 'Sample Content 8',
					datetimeCreated: '2023-12-13T08:30:00Z',
					contentPreCurrentUpdate: 'Previous content before update 8',
					datetimeCurrentUpdate: '2023-12-13T11:00:00Z',
					blogStatus: 2,
					blogOwner: 135792468,
					isBlocked: 1,
					priority: 2,
					isDeleted: 0,
				},
				{
					bid: 9,
					title: 'Sample Title 9',
					content: 'Sample Content 9',
					datetimeCreated: '2023-12-14T09:45:00Z',
					contentPreCurrentUpdate: 'Previous content before update 9',
					datetimeCurrentUpdate: '2023-12-14T12:15:00Z',
					blogStatus: 1,
					blogOwner: 246813579,
					isBlocked: 0,
					priority: 1,
					isDeleted: 1,
				},
				{
					bid: 10,
					title: 'Sample Title 10',
					content: 'Sample Content 10',
					datetimeCreated: '2023-12-15T10:00:00Z',
					contentPreCurrentUpdate: 'Previous content before update 10',
					datetimeCurrentUpdate: '2023-12-15T12:30:00Z',
					blogStatus: 2,
					blogOwner: 987654321,
					isBlocked: 1,
					priority: 2,
					isDeleted: 0,
				},
				{
					bid: 11,
					title: 'Sample Title 11',
					content: 'Sample Content 11',
					datetimeCreated: '2023-12-16T11:15:00Z',
					contentPreCurrentUpdate: 'Previous content before update 11',
					datetimeCurrentUpdate: '2023-12-16T13:45:00Z',
					blogStatus: 1,
					blogOwner: 135792468,
					isBlocked: 0,
					priority: 1,
					isDeleted: 1,
				},
			]);
		}
		console.log(`blogs page`);
	}, []);

	return (
		<Box>
			{listBlogs.map((blog) => {
				return <BlogCard key={blog.bid} blog={blog} />;
			})}
		</Box>
	);
}
