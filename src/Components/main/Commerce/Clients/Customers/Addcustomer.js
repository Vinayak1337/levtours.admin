import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../Footer"
const Addcustomer = () => {
	return (
		<div className='main-content'>
			<div class='page-content'>
				<div class='container-fluid'>
					<div class='row'>
						<div class='col-12'>
							<div
								class='
                      page-title-box
                      d-flex
                      align-items-center
                      justify-content-between
                    '
							>
								<h4 class='mb-0'>Customers - Add Customer</h4>
								<div class='page-title-right'>
									<ol class='breadcrumb m-0'>
										<li class='breadcrumb-item'>
											<a href='javascript: void(0);'>Lev Tours</a>
										</li>
										<li class='breadcrumb-item'>Customers</li>
										<li class='breadcrumb-item'>Add</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class='row'>
						<div class='col-lg-12'>
							<div class='card'>
								<div class='card-body'>
									<div class='row'>
										<div class='col-md-12 col-lg-6 col-xl-6'>
											<h1 class='text-left head-small'>Add Customer</h1>

											<form>
												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																Customer ID
															</label>
															<input
																//   value={name}
																//   onChange={(e) => setName(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
																disabled
															/>
														</div>
													</div>
												</div>
												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																Name
															</label>
															<input
																//   value={name}
																//   onChange={(e) => setName(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
                                                <div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																Address
															</label>
															<textarea
																//   value={message}
																//   onChange={(e) => setMessage(e.target.value)}
																class='form-control input-field'
																rows='3'
															></textarea>
														</div>
													</div>
												</div>
                                                <div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
															PAN Number
															</label>
															<input
																//   value={phoneNo}
																//   onChange={(e) => setphoneNo(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
                                                <div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
															GST Number
															</label>
															<input
																//   value={phoneNo}
																//   onChange={(e) => setphoneNo(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
                                                <div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
															Contact	Name
															</label>
															<input
																//   value={name}
																//   onChange={(e) => setName(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
															Contact Mobile Number
															</label>
															<input
																//   value={phoneNo}
																//   onChange={(e) => setphoneNo(e.target.value)}
																type='text'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
                                                <div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
															Contact Email
															</label>
															<input
																//   value={email}
																//   onChange={(e) => setEmail(e.target.value)}
																type='email'
																class='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
													</div>
												</div>
												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group text-left'>
															<button
																//   onClick={saveContact}
																type='button'
																class='
                                        btn btn-success btn-login
                                        waves-effect waves-light
                                        mr-3
                                      '
															>
																Save
															</button>
															<Link to="/client/customers">
															<button
																//   onClick={saveContact}
																type='button'
																class='
                                        btn btn-success
                                        waves-effect waves-light
                                        mr-3
                                      '
															>
																Cancel
															</button>
															</Link>
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
			<Footer />
		</div>
	);
};

export default Addcustomer;
