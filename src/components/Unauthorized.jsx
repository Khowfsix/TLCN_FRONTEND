import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Unauthorized() {
	return (
		<Box
			sx={{
				height: '75vh',
				fontFamily: "'Ropa Sans' sans-serif",
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Typography
				variant="h1"
				sx={{
					fontSize: '40px',
					margin: '0px',
					color: 'black',
				}}>
				Uầy, không vào được!
			</Typography>

			<Box
				sx={{
					margin: '30px auto',
					fontSize: '126px',
					lineHeight: '126px',
					borderRadius: '30px',
				}}>
				403
			</Box>

			<Typography
				variant="h5"
				sx={{
					marginTop: '10px',
					fontSize: '25px',
					textAlign: 'center',
					width: '40%',
				}}>
				Bạn không được phép truy cập trang này!
			</Typography>
		</Box>
	);
}
