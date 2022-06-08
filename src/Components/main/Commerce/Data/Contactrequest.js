import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function Contactrequest() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [phoneNumber, setphoneNumber] = useState('');
	const { token } = isAutheticated();

	async function saveContact() {
		if (phoneNumber.length > 10 || phoneNumber < 10) {
			return swal('Oops!', 'Invalid Phone Number', 'error');
		}
		if (
			!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
				email
			)
		)
			return swal('Oops!', 'Please Fill Valid Email Address', 'error');
		let contact = await axios.post(
			`${API}/api/contact/add_Contact`,
			{
				name,
				email,
				phoneNumber,
				message
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log(contact.data);
		if (contact.data.message === 'Success') {
			swal('Success!', 'Contact Request Added Successfully', 'success');
			setTimeout(() => {
				window.location.href = '/contact-request';
			}, 3000);
		}
	}

	return (
		<div className="main-content">
			<div clasName="page-content">
				<div clasName="container-fluid">
					<div clasName="row">
						<div clasName="col-12">
							<div clasName="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  ">
								<h4 clasName="mb-0">Data Collection - Contact Requests</h4>
								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item">Data Collection - Contact Requests</li>
										<li clasName="breadcrumb-item">Add Contact Request Manually</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-lg-12">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12 col-lg-6 col-xl-6">
											<h1 clasName="text-left head-small">Add Contact Request Manually</h1>

											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Name
															</label>
															<input
																value={name}
																onChange={e => setName(e.target.value)}
																type="text"
																clasName="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Email
															</label>
															<input
																value={email}
																onChange={e => setEmail(e.target.value)}
																type="text"
																clasName="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Phone Number
															</label>
															<input
																value={phoneNumber}
																onChange={e => setphoneNumber(e.target.value)}
																type="text"
																clasName="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Message
															</label>
															<textarea
																value={message}
																onChange={e => setMessage(e.target.value)}
																clasName="form-control input-field"
																rows="5"
															/>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group text-left">
															<button
																onClick={saveContact}
																type="button"
																clasName="
                                      btn btn-success btn-login
                                      waves-effect waves-light
                                      mr-3
                                    ">
																Save
															</button>
														</div>
													</div>
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
		</div>
	);
}

export default Contactrequest;
