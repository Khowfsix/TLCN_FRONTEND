import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Box, Container, InputAdornment, createTheme, IconButton, Stack } from '@mui/material';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { alpha } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { MailOutline } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
	palette: {
		secondary: {
			main: '#000000',
		},
	},
});

const fullnameRegex = /^[A-Za-zÀ-ỹĐđ\s]{1,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;

const Register = () => {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const [validFullName, setValidFullName] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [validUsername, setValidUsername] = useState(true);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);

	const [errorSnackbar, setErrorSnackbar] = useState(false);
	const [successSnackbar, setSuccessSnackbar] = useState(false);

	const handleFullNameChange = (event) => {
		let value = event.target.value;
		setFullName(value);
		if (!fullnameRegex.test(value)) {
			setValidFullName(false);
		} else {
			setValidFullName(true);
		}
	};

	const handleUsernameChange = (event) => {
		let value = event.target.value;
		setUsername(value);
		if (!usernameRegex.test(value)) {
			setValidUsername(false);
		} else {
			setValidUsername(true);
		}
	};

	const handleEmailChange = (event) => {
		let value = event.target.value;
		setEmail(value);
		if (!emailRegex.test(value)) {
			setValidEmail(false);
		} else {
			setValidEmail(true);
		}
	};

	const handlePasswordChange = (event) => {
		let value = event.target.value;
		setPassword(value);
		if (!passwordRegex.test(value)) {
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

	const handleClickHome = () => {
		navigate('/home');
	};

	const handleClickSignIn = () => {
		navigate('/login');
	};

	const handleRegister = (event) => {
		event.preventDefault();
		if (validFullName && fullName != '' && validUsername && username != '' && validEmail && email != '' && validPassword && password != '') {
			setLoading(true);
		} else {
			if (!validFullName || fullName == '') {
				setValidFullName(false);
				setFullName('');
			}
			if (!validUsername || username == '') {
				setValidUsername(false);
				setUsername('');
			}
			if (!validEmail || email == '') {
				setValidEmail(false);
				setEmail('');
			}
			if (!validPassword || password == '') {
				setValidPassword(false);
				setPassword('');
			}
		}
	};

	return (
		<Box
			sx={{
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Stack>
				<Box
					sx={{
						//backgroundColor: 'red',
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
						Đi về nhà là đi về nhà
					</Typography>
					<HomeIcon
						onClick={handleClickHome}
						sx={{
							//textDecoration: "none",
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
							<form onSubmit={handleRegister}>
								<Typography
									variant="h2"
									sx={{
										fontSize: '2rem',
										color: 'black',
										textAlign: 'center',
										fontWeight: '450',
										//marginBottom: "5px",
									}}>
									Đăng ký tài khoản <br /> học viên
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
											fullWidth
											type="text"
											label={validFullName ? <Typography color={'black'}>Fullname</Typography> : <Typography color={'red'}>Fullname</Typography>}
											autoComplete="new-text"
											value={fullName}
											onChange={handleFullNameChange}
											error={!validFullName}
											InputProps={{
												disableUnderline: true,
												endAdornment: (
													<InputAdornment position="end">
														<AccountCircleOutlinedIcon
															sx={{
																position: 'absolute',
																right: '0px',
																color: validFullName ? 'black' : 'red',
																fontSize: '1.2em',
															}}
														/>
													</InputAdornment>
												),
											}}
											sx={{
												width: '90%',
												height: '50px',
												background: 'transparent',
												outline: 'none',
												fontSize: '1em',
												color: '#000',
												borderBottom: validFullName ? '2px solid black' : '2px solid red',
												borderBottomWidth: '2px',
											}}
										/>
									</Grid>

									{!validFullName && (
										<Grid
											item
											xs={12}
											sx={{
												display: 'flex',
												justifyContent: 'left',
												alignItems: 'center',
											}}>
											<Box
												color={'red'}
												display={'flex'}
												marginLeft={'16px'}
												marginRight={'15px'}
												//marginBottom={"3px"}
											>
												<ErrorOutlineOutlinedIcon
													sx={{
														fontSize: 15,
														paddingLeft: '2px',
														marginTop: '2px',
													}}
												/>

												<Typography color="red" fontSize="12px" lineHeight="20px" paddingLeft={'5px'}>
													Full name required and contain only letters
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
											fullWidth
											type="text"
											label={validUsername ? <Typography color={'black'}>Username</Typography> : <Typography color={'red'}>Username</Typography>}
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
											<Box
												color={'red'}
												display={'flex'}
												marginLeft={'16px'}
												marginRight={'15px'}
												//marginBottom={"3px"}
											>
												<ErrorOutlineOutlinedIcon
													//color="red"
													sx={{
														fontSize: 15,
														paddingLeft: '2px',
														marginTop: '2px',
													}}
												/>

												<Typography color="red" fontSize="12px" lineHeight="20px" paddingLeft={'5px'}>
													Username must be 3-20 characters long and not contain any special characters
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
											type="email"
											label={validEmail ? <Typography color={'black'}>Email</Typography> : <Typography color={'red'}>Email</Typography>}
											autoComplete="new-email"
											value={email}
											onChange={handleEmailChange}
											error={!validEmail}
											InputProps={{
												disableUnderline: true,
												endAdornment: (
													<InputAdornment position="end">
														<MailOutline
															sx={{
																position: 'absolute',
																right: '0px',
																color: validEmail ? 'black' : 'red',
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
												borderBottom: validEmail ? '2px solid black' : '2px solid red',
												borderBottomWidth: '2px',
											}}
										/>
									</Grid>

									{!validEmail && (
										<Grid
											item
											xs={12}
											sx={{
												display: 'flex',
												justifyContent: 'left',
												alignItems: 'center',
											}}>
											<Box
												color={'red'}
												display={'flex'}
												marginLeft={'16px'}
												marginRight={'15px'}
												//marginBottom={"3px"}
											>
												<ErrorOutlineOutlinedIcon
													//color="red"
													sx={{
														fontSize: 15,
														paddingLeft: '2px',
														marginTop: '2px',
													}}
												/>

												<Typography color="red" fontSize="12px" lineHeight="20px" paddingLeft={'5px'}>
													Must be a valid email
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
											error={!validPassword}
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
																		//top: '20px',
																	}}
																/>
															) : (
																<VisibilityOffOutlinedIcon
																	sx={{
																		position: 'absolute',
																		right: '0px',
																		color: validPassword ? 'black' : 'red',
																		fontSize: '0.9em',
																		//top: '20px',
																	}}
																/>
															)}
														</IconButton>
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
												color: '#fff',
												borderBottom: validPassword ? '2px solid black' : '2px solid red',
												borderBottomWidth: '2px',
											}}
										/>
									</Grid>

									{!validPassword && (
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
													//color="red"
													sx={{
														fontSize: 15,
														paddingLeft: '2px',
														marginTop: '2px',
													}}
												/>

												<Typography color="red" fontSize="12px" lineHeight="20px" paddingLeft={'5px'}>
													Passwords must be at least 6 characters have at least one uppercase letter, lowercase, digit and special character
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
											marginTop: '5px',
										}}>
										{loading ? (
											<CircularProgress sx={{ color: 'black' }} />
										) : (
											<Button
												type="submit"
												theme={theme}
												variant="contained"
												color="secondary"
												sx={{
													height: '40px',
													color: 'white',
													borderRadius: '10px',
													fontSize: '1em',
													fontWeight: 600,
													width: '90%',
													marginTop: '15px',
												}}>
												Sign up
											</Button>
										)}
									</Grid>
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
											paddingTop: '10px',
											fontSize: '.9em',
										}}>
										<Typography variant="small" sx={{ color: 'black' }}>
											Already have account?{' '}
											<Typography
												// component={Link}
												// to="/login"
												onClick={handleClickSignIn}
												variant="small"
												sx={{
													textDecoration: 'underline',
													cursor: 'pointer',
													color: 'black',
												}}>
												Log in
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
					Username or email already exists
				</Alert>
			</Snackbar>

			<Snackbar open={successSnackbar} autoHideDuration={1000} onClose={() => setSuccessSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity="success" onClose={() => setSuccessSnackbar(false)}>
					Sign up successful
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Register;
