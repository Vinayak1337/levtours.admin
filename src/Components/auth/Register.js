import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import { API } from '../../API';
export default function Register() {
	const validEmailRegex = RegExp(
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
	);
	const validPasswordRegex = RegExp(
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/
	);

	const validateForm = () => {
		let valid = true;
		Object.values(errors).forEach(val => {
			if (val.length > 0) {
				valid = false;
				return false;
			}
		});
		Object.values(user).forEach(val => {
			if (val.length <= 0) {
				valid = false;
				return false;
			}
		});
		return valid;
	};

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({
		firstNameError: '',
		lastNameError: '',
		emailError: '',
		passwordError: ''
	});

	const [validForm, setValidForm] = useState(false);
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	useEffect(
		() => {
			if (validateForm()) {
				setValidForm(true);
			} else {
				setValidForm(false);
			}
		},
		[errors]
	);

	const handleSubmit = e => {
		e.preventDefault();
		//SUBMIT FORM
		setLoading(true);
		axios
			.post(`${API}/signup`, { ...user, address: 'null', mobile: 1234567890 })
			.then(response => {
				setLoading(false);
				//console.log(response);
				localStorage.setItem(
					'auth',
					JSON.stringify({
						user: user.email,
						token: response.data.token
					})
				);

				history.push('/dashboard');
			})
			.catch(err => {
				setLoading(false);
				//console.log(err.response);

				let message = err.response.data.status;
				swal({
					title: 'Error',
					text: message,
					icon: 'error',
					buttons: true,
					dangerMode: true
				});
				if (err.response.data) {
					//   setLoginError(err.response && err.response.data.status);
				} else {
					//   setLoginError("Network Error!");
				}
			});
	};

	const handleChange = e => {
		e.preventDefault();
		// //console.log(e.target.name + "  " + e.target.value);
		const { name, value } = e.target;

		switch (name) {
			case 'firstName':
				setErrors({
					...errors,
					firstNameError: value.length < 1 ? 'required' : ''
				});

				break;
			case 'lastName':
				setErrors({
					...errors,
					lastNameError: value.length < 1 ? 'required' : ''
				});

				break;
			case 'email':
				setErrors({
					...errors,
					emailError: validEmailRegex.test(value) ? '' : 'Email is not valid!'
				});

				break;
			case 'password':
				setErrors(errors => ({
					...errors,
					passwordError: validPasswordRegex.test(value)
						? ''
						: 'Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase, Atleast One Digit, Atleast One Special Character'
				}));
				break;
			default:
				break;
		}
		setUser({ ...user, [e.target.name]: e.target.value });
		//console.log(errors.passwordError);
	};

	return (
		<div clasName="authentication-bg h-100">
			<div clasName="account-pages pt-sm-5">
				<div clasName="container">
					<div clasName="row">
						<div clasName="col-lg-12">
							<div clasName="text-center">
								<a href="https://tellytell.com" clasName="mb-5 d-block auth-logo">
									<img
										src="assets/images/logo-dark.png"
										alt=""
										height="25"
										clasName="logo logo-dark"
									/>
									<img
										src="assets/images/logo-light.png"
										alt=""
										height="25"
										clasName="logo logo-light"
									/>
								</a>
							</div>
						</div>
					</div>
					<div clasName="row align-items-center justify-content-center">
						<div clasName="col-md-8 col-lg-6 col-xl-5">
							<div clasName="card">
								<div clasName="card-body p-4">
									<div clasName="text-center mt-2">
										<h5 clasName="text-primary welcome-text">Signup!</h5>
									</div>
									<div clasName="p-2 mt-4">
										<form>
											<div clasName="form-group">
												<label for="username">First Name</label>
												<input
													type="text"
													onChange={handleChange}
													clasName="form-control input-field"
													value={user.firstName}
													name="firstName"
													placeholder="First Name"
												/>

												<span className="text-danger">
													{errors.firstNameError}
												</span>
											</div>
											<div clasName="form-group">
												<label for="username">Last Name</label>
												<input
													type="text"
													onChange={handleChange}
													name="lastName"
													className="form-control input-field"
													placeholder="Last Name"
													value={user.lastName}
												/>

												<span className="text-danger">
													{errors.lastNameError}
												</span>
											</div>
											<div clasName="form-group">
												<label for="username">Email</label>
												<input
													value={user.email}
													name="email"
													onChange={handleChange}
													type="email"
													required
													clasName="form-control input-field"
													placeholder="Enter Email ID"
												/>
												<span className="text-danger">
													{errors.emailError}
												</span>
											</div>

											<div clasName="form-group">
												<label for="userpassword">Password</label>
												<input
													value={user.password}
													name="password"
													required
													onChange={handleChange}
													type="password"
													clasName="form-control input-field"
													placeholder="Enter password"
												/>

												<span className="text-danger">
													{errors.passwordError}
												</span>
											</div>

											<div clasName="mt-3 text-right">
												<a href="index.html">
													<button
														disabled={!validForm}
														onClick={handleSubmit}
														clasName="
                              btn btn-primary
                              w-sm
                              waves-effect waves-light
                            ">
														<ClipLoader color="blue" loading={loading} size={20} />

														{!loading && 'Register'}
													</button>
													{validForm}
												</a>
											</div>
											<div>
												<h6>
													Already have an account?
													<Link to="/"> Log In</Link>
												</h6>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
