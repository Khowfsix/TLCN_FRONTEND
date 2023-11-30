import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import { FormControl } from '@material-ui/core';
import { Grid, TextField, Button, Typography, Box, Container, InputAdornment, Stack, Snackbar, Alert } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { Select, MenuItem, InputLabel } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

// import { useDispatch } from 'react-redux';
import sha256 from 'crypto-js/sha256';

import axios from '../../apis/axiosConfig';

export default function Login() {
	// const hashedPassword = sha256(myPassword).toString();

	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(true);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	// const [check, setCheck] = useState(false);

	const [role, setRole] = useState('');

	const [errorSnackbar, setErrorSnackbar] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleUsernameChange = (event) => {
		let value = event.target.value;
		setUsername(value);
		if (value == '') {
			setValidUsername(false);
		} else {
			setValidUsername(true);
		}
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		if (event.target.value == '') {
			setValidPassword(false);
		} else {
			setValidPassword(true);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChangeRole = (event) => {
		let newRole = event.target.value;
		console.log(newRole);
		setRole(newRole);
	};

	const handleLogin = (event) => {
		const hashedPassword = sha256(password).toString();
		event.preventDefault();

		if (validUsername && username != '' && validPassword && password != '' && ['student', 'teacher'].includes(role)) {
			const req = {
				username: username,
				password: hashedPassword,
				role: role,
			};

			setLoading(true);
			axios
				.post(`/auth/login`, req)
				.then((response) => {
					console.log(response.data);
					localStorage.setItem('accessToken', response.data.Authorization);
					console.log(localStorage.getItem('accessToken'));
				})
				.catch((error) => {
					// Handle the error
					console.error(error);
				});

			setLoading(false);
			navigate('/Home');

			// dispatch({
			// 	type: 'saga/userLogin',
			// 	payload: { username, password, check },
			// });
			//dispatch({ type: "saga/getUserId", payload: null})

			console.log(`username: ${username} \n password: ${password} \n passwordHashed: ${hashedPassword}`);
		} else {
			if (!validUsername || username == '') {
				setValidUsername(false);
			}
			if (!validPassword || password == '') {
				setValidPassword(false);
			}
			//setUsername("");
		}
	};

	const handleClickHome = () => {
		// dispatch({
		// 	type: 'error/setError',
		// 	payload: { status: 'idle', message: '' },
		// });
		navigate('/home');
	};

	const handleClickForgot = () => {
		// dispatch({
		// 	type: 'error/setError',
		// 	payload: { status: 'idle', message: '' },
		// });
		navigate('/recovery');
	};

	const handleClickSignUp = () => {
		// dispatch({
		// 	type: 'error/setError',
		// 	payload: { status: 'idle', message: '' },
		// });
		navigate('/register');
	};

	return (
		<Box
			sx={{
				// backgroundImage: `url(${images[currentIndex]})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				transition: 'background-image 0.3s ease-in-out',
				//transition: 'background-position 0.3s ease-in-out',
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Stack>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '5%',
					}}>
					<Typography
						onClick={handleClickHome}
						sx={{
							color: 'white',
							cursor: 'pointer',
							fontWeight: '300',
						}}>
						Back to home
					</Typography>
					<HomeIcon
						onClick={handleClickHome}
						sx={{
							color: 'white',
							cursor: 'pointer',
							marginLeft: '3px',
						}}
					/>
				</Box>
				<Container
					component="main"
					maxWidth="xs"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Box
						sx={{
							position: 'relative',
							width: '95%',
							height: '100%',
							background: 'transparent',
							border: '2px solid rgba(255, 255, 255, 0.5)',
							borderRadius: '20px',
							backdropFilter: 'blur(5px)',
							backgroundColor: alpha('#FFFFFF', 0.8),
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '0px 0px 7px 7px rgba(255, 255, 255, 0.25)',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								paddingTop: '5%',
								paddingBottom: '5%',
							}}>
							<form onSubmit={handleLogin}>
								<Typography
									variant="h2"
									sx={{
										fontSize: '3rem',
										color: 'black',
										textAlign: 'center',
										fontWeight: '450',
									}}>
									Đăng nhập
								</Typography>

								<Grid
									container
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Grid
										item
										xs={12}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '3px',
											//marginTop: '5px',
										}}>
										<TextField
											variant="standard"
											//required
											fullWidth
											type="text"
											label={validUsername ? <Typography color={'black'}>Tên đăng nhập</Typography> : <Typography color={'red'}>Username</Typography>}
											autoComplete="new-text"
											value={username}
											onChange={handleUsernameChange}
											error={!validUsername}
											InputProps={{
												disableUnderline: true,
												endAdornment: (
													<InputAdornment position="end">
														<AccountCircleOutlinedIcon
															sx={{
																position: 'absolute',
																right: '0px',
																color: validUsername ? 'black' : 'red',
																fontSize: '1.2em',
																//top: '20px',
															}}
														/>
													</InputAdornment>
												),
												sx: {
													color: '#000',
												},
											}}
											sx={{
												width: '90%',
												height: '50px',
												background: 'transparent',
												outline: 'none',
												fontSize: '1em',
												color: '#000',
												borderBottom: validUsername ? '2px solid black' : '2px solid red',
												borderBottomWidth: '2px',
											}}
										/>
									</Grid>

									{!validUsername && (
										<Grid
											item
											xs={12}
											sx={{
												display: 'flex',
												justifyContent: 'left',
												alignItems: 'center',
											}}>
											<Box color={'red'} display={'flex'} marginLeft={'16px'} marginRight={'15px'}>
												<ErrorOutlineOutlinedIcon
													sx={{
														fontSize: 15,
														paddingLeft: '2px',
														marginTop: '2px',
													}}
												/>

												<Typography color="red" fontSize="12px" lineHeight="20px" paddingLeft={'5px'}>
													Username is required
												</Typography>
											</Box>
										</Grid>
									)}

									<Grid
										item
										xs={12}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '3px',
											marginTop: '5px',
										}}>
										<TextField
											variant="standard"
											//required
											fullWidth
											type={showPassword ? 'text' : 'password'}
											label={validPassword ? <Typography color={'black'}>Password</Typography> : <Typography color={'red'}>Password</Typography>}
											autoComplete="new-password"
											value={password}
											onChange={handlePasswordChange}
											InputProps={{
												disableUnderline: true,
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword}>
															{showPassword ? (
																<VisibilityOutlinedIcon
																	sx={{
																		position: 'absolute',
																		right: '0px',
																		color: validPassword ? 'black' : 'red',
																		fontSize: '0.9em',
																	}}
																/>
															) : (
																<VisibilityOffOutlinedIcon
																	sx={{
																		position: 'absolute',
																		right: '0px',
																		color: validPassword ? 'black' : 'red',
																		fontSize: '0.9em',
																	}}
																/>
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
											sx={{
												width: '90%',
												height: '50px',
												background: 'transparent',
												outline: 'none',
												fontSize: '1em',
												color: '#fff',
												borderBottom: validPassword ? '2px solid black' : '2px solid red',
												borderBottomWidth: '2px',
												marginTop: '3px',
											}}
										/>
									</Grid>

									<Grid
										item
										xs={12}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '3px',
											marginTop: '5px',
										}}>
										<InputLabel sx={{ color: 'black', marginRight: '50px' }}>Đăng nhập với quyền: </InputLabel>
										<Select value={role} onChange={handleChangeRole}>
											<MenuItem value="student">Học viên</MenuItem>
											<MenuItem value="teacher">Giảng viên</MenuItem>
										</Select>
									</Grid>
								</Grid>

								<Grid
									item
									xs={12}
									sx={{
										margin: '15px 20px 15px',
										fontSize: '.9em',
										color: '#fff',
										display: 'flex',
										justifyContent: 'center',
										alignContent: 'center',
										textAlign: 'center',
									}}>
									<Box
										sx={{
											alignContent: 'center',
											textAlign: 'center',
										}}>
										<Typography
											onClick={handleClickForgot}
											variant="small"
											sx={{
												color: 'black',
												lineHeight: '15px',
												textDecoration: 'underline',
												cursor: 'pointer',
											}}>
											Quên pass rồi à con gà?{' '}
										</Typography>
									</Box>
								</Grid>

								<Grid
									item
									xs={12}
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									{loading ? (
										<CircularProgress sx={{ color: 'black' }} />
									) : (
										<Button
											type="submit"
											variant="contained"
											color="primary"
											// color="secondary"
											sx={{
												height: '40px',
												color: 'white',
												borderRadius: '10px',
												fontSize: '1em',
												fontWeight: 600,
												width: '90%',
											}}>
											Log in
										</Button>
									)}
									{/* <CircularProgress /> */}
								</Grid>

								<Grid container justifyContent="center">
									<Grid
										item
										xs={12}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											lineHeight: '15px',
											paddingTop: '15px',
											fontSize: '.9em',
										}}>
										<Typography variant="small" sx={{ color: 'black' }}>
											Bạn đếu có tài khoản ư?{' '}
											<Typography
												// component={Link}
												// to="/register"
												onClick={handleClickSignUp}
												variant="small"
												sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}>
												Đúng vậy
											</Typography>
										</Typography>
									</Grid>
								</Grid>
							</form>
						</Box>
					</Box>
				</Container>
			</Stack>

			<Snackbar open={errorSnackbar} autoHideDuration={5000} onClose={() => setErrorSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity="error" onClose={() => setErrorSnackbar(false)}>
					{/* {newError.message} */}
					Username or password is incorrect
				</Alert>
			</Snackbar>
		</Box>
	);
}
