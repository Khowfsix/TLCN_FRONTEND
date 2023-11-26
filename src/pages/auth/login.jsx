import React from 'react';
import { Box, TextField, FormControl, Typography, Button } from '@material-ui/core';

export default function Login() {
	return (
		<Box className="w-full h-screen flex items-center justify-center bg-indigo-100">
			<FormControl className="w-full md:w-1/3 rounded-lg">
				<Box className="flex font-bold justify-center mt-6">
					<img class="h-20 w-20 mb-3" src="https://dummyimage.com/64x64" />
				</Box>
				<Typography variant="h2" className="text-2xl text-center text-gray-200 mb-8">
					Login
				</Typography>
				<Box className="px-12 pb-10">
					<Box className="w-full mb-2">
						<Box className="flex items-center">
							<TextField
								type="text"
								placeholder="Email Address"
								className="
					  w-full
					  border
					  rounded
					  px-3
					  py-2
					  text-gray-700
					  focus:outline-none
					"
							/>
						</Box>
					</Box>
					<Box className="w-full mb-2">
						<Box className="flex items-center">
							<TextField
								type="password"
								placeholder="Password"
								className="
					  w-full
					  border
					  rounded
					  px-3
					  py-2
					  text-gray-700
					  focus:outline-none
					"
							/>
						</Box>
					</Box>
					<Button
						type="submit"
						className="
				  w-full
				  py-2
				  mt-8
				  rounded-full
				  bg-blue-400
				  text-gray-100
				  focus:outline-none
				">
						Login
					</Button>
				</Box>
			</FormControl>
		</Box>
	);
}
