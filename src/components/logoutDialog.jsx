import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import axios from 'axios';

function LogoutConfirmationDialog({ open, onClose }) {
	const handleConfirm = () => {
		// Xử lý logic đăng xuất
		// ...
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Xác nhận đăng xuất</DialogTitle>
			<DialogContent>
				<DialogContentText>Bạn có chắc chắn muốn đăng xuất không?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>Hủy</Button>
				<Button onClick={handleConfirm} autoFocus>
					Đăng xuất
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LogoutConfirmationDialog;
