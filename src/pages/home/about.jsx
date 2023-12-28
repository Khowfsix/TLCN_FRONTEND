import React from 'react';
import { Typography, Avatar, Grid, Card, CardContent } from '@mui/material';

export default function About() {
	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Thông tin nhóm dự án
			</Typography>
			<h2>
				TIỂU LUẬN CHUYÊN NGÀNH HỆ THỐNG THÔNG TIN
				<br />
				<b>ĐỀ TÀI:</b> SỬ DỤNG NGÔN NGỮ PYTHON VỚI THƯ VIỆN FRAMEWORK: FLASK VÀ REACTJS ĐỂ PHÁT TRIỂN HỆ THỐNG THÔNG TIN HỖ TRỢ QUẢN LÝ ĐÀO TẠO LẬP TRÌNH TRỰC TUYẾN
			</h2>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6">Mô tả dự án:</Typography>
					<Typography sx={{ mb: 1.5, textAlign: 'left' }}>
						Đề tài tiểu luận chuyên ngành Hệ thống thông tin Sử dụng ngôn ngữ python với thư viện framework: Flask và Reactjs để phát triển hệ thống thông tin hỗ trợ quản lý đào tạo lập
						trình trực tuyến có nhiều phân hệ khác nhưng do hạn chế về mặc thời gian, đề tài chỉ tập trung các phân hệ, bao gồm: Phân hệ học viên, phân hệ giảng viên, phân hệ nhân viên.
						<p>Tiến trình thực hiện đồ án gồm các nội dung sau:</p>
						<p>
							+ Nội dung phân tích thiết kế hệ thống, bao gồm: Phân tích yêu cầu chức năng của các đối tượng người dùng, phân tích, thiết kế và cài đặt cơ sở dữ liệu, phân tích thiết kế
							về giao diện người dùng
						</p>
						<p>+ Nội dung xây dựng hệ thống theo từng phân hệ, bao gồm: Lược đồ Sequence theo các chức năng, cấu trúc hệ thống, kết quả xây dựng đạt được.</p>
						<p>+ Nội dung kiểm thử hệ thống theo từng đối tượng người dùng</p>
						<p>+ Nội dung quá trình triển khai hệ thống theo từng đối tượng người dùng</p>
					</Typography>
					<Typography variant="h6">Môn: Tiểu luận chuyên ngành Hệ thống Thông tin</Typography>
					<Typography variant="h6">Giảng viên hướng dẫn: Võ Xuân Thể</Typography>

					<Typography variant="h6">Sinh viên:</Typography>
					<div>
						<Grid item key={1}>
							<Typography>Nguyên Ngọc Phát - 20110261</Typography>
						</Grid>
						<Grid item key={2}>
							<Typography>Lý Hồng Phát - 20110692</Typography>
						</Grid>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
