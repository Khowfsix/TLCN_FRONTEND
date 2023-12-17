import { Box, Typography, Container } from '@material-ui/core';

export default function Home() {
	return (
		<Container className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
			<Box className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
				<img className="object-cover object-center rounded" alt="hero" src="src/assets/home.jpg" style={{ width: '300px', height: 'auto' }} />
			</Box>
			<Box className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
				<Typography variant="h1" className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
					P-P Learning web
					<br className="hidden lg:inline-block" />
					Hệ thống dạy <br />
					lập trình
				</Typography>
				<Typography variant="body1" className="mb-8 leading-relaxed">
					Chào mừng bạn đến với Web Dạy Lập Trình! Chúng tôi là nền tảng học trực tuyến cung cấp các khóa học lập trình từ căn bản đến nâng cao. Tại đây, bạn có thể học các ngôn ngữ lập
					trình như Python, JavaScript, Java, C++, và nhiều hơn nữa. Chúng tôi hân hạnh giới thiệu đội ngũ giảng viên giàu kinh nghiệm và kiến thức sâu rộng. Họ sẽ truyền đạt cho bạn cách
					suy nghĩ logic, xây dựng ứng dụng thực tế, và giúp bạn phát triển kỹ năng lập trình chuyên nghiệp. Các khóa học trên Web Dạy Lập Trình được thiết kế để đáp ứng nhu cầu của mọi
					người, từ người mới học lập trình cho đến những người đã có kinh nghiệm. Bạn sẽ được học thông qua các bài giảng video chất lượng cao, bài tập thực hành, và dự án thực tế.
				</Typography>
			</Box>
		</Container>
	);
}
