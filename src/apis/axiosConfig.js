import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://backendtlcn.devforfuture.com/api',
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
});

const noToken = ['/auth/login', '/auth/prefresh-token', '/auth/sendotp-forgotpass', '/auth/checkotp-forgotpass', '/auth/forgetpass'];

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `${token}`;
	}
	return config;
});

export default instance;
