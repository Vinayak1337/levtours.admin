import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
let validator = require('email-validator');

function Addemail() {
	const [email, setEmail] = useState('');
	const { token } = isAutheticated();

	async function addEmail() {
		if (!validator.validate(email)) {
			swal('Opps!', 'Please Enter Valid Email Address', 'error');
		}
		let subscribeNews = await axios.post(
			`${API}/api/user/subscribeNewsLetter`,
			{
				email
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		if (subscribeNews.data) {
			swal('Success !', 'Added Email Successfully', 'success');
			setTimeout(() => {
				window.location.href = '/email-signup';
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
								<h4 clasName="mb-0">Data Collection - Email Signups</h4>
								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item">Data Collection - Email Signups</li>
										<li clasName="breadcrumb-item">Add Email Manually</li>
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
											<h1 clasName="text-left head-small">Add Email Manually</h1>

											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Email
															</label>
															<input
																onChange={e => setEmail(e.target.value)}
																value={email}
																type="email"
																clasName="form-control input-field"
																id="basicpill-phoneno-input"
															/>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group text-left">
															<button
																onClick={addEmail}
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

export default Addemail;
