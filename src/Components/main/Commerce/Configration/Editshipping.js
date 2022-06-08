import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useParams } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function Editshipping() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [rate, setRate] = useState('');
	const [status, setStatus] = useState(false);
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const { id } = useParams();
	const { token } = isAutheticated();

	useEffect(() => {
		async function getShipping() {
			let shipping = await axios.get(`${API}/api/shipping/view_Shipping/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setName(shipping.data.Shipping.name);
			setDescription(shipping.data.Shipping.description);
			setRate(shipping.data.Shipping.rate);
			setStatus(shipping.data.Shipping.status);
			setCountry(shipping.data.Shipping.country);
			setState(shipping.data.Shipping.state);
		}

		getShipping();
	}, []);
	async function editShipping() {
		const update = await axios.patch(`${API}/api/shipping/update_Shipping/${id}`, {
			name,
			description,
			rate,
			status: status === 'Active' ? true : false,
			country,
			state
		});
		if (update.data.data) {
			window.location.href = '/shipping';
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
								<h4 clasName="mb-0">Edit Shipping Rate</h4>
								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item active">Configuration</li>
										<li clasName="breadcrumb-item active">Edit Shipping Rate</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-12">
							<div clasName="form-group text-right">
								<button
									onClick={editShipping}
									type="button"
									clasName="
                          btn btn-success btn-login
                          waves-effect waves-light
                          mr-3
                        ">
									Save
								</button>

								<a href="/shipping">
									<button
										type="button"
										clasName="
                          btn btn-success btn-cancel
                          waves-effect waves-light
                          mr-3
                        ">
										Cancel
									</button>
								</a>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-lg-8">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Shipping Method Name
															</label>
															<input
																value={name}
																onChange={e => setName(e.target.value)}
																type="text"
																clasName="form-control input-field"
															/>
														</div>
													</div>
												</div>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Description (Optional)
															</label>
															<textarea
																value={description}
																onChange={e => setDescription(e.target.value)}
																clasName="form-control input-field"
																rows="5"
															/>
														</div>
													</div>
												</div>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Rate
															</label>
															<input
																value={rate}
																onChange={e => setRate(e.target.value)}
																type="text"
																clasName="form-control input-field"
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div clasName="col-lg-4">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Status
															</label>
															<select
																onChange={e => setStatus(e.target.value)}
																value={status ? 'Active' : 'Inactive'}
																clasName="form-control input-field">
																<option value="">--select--</option>
																<option value="Active">Active</option>
																<option value="Inactive">Inactive</option>
															</select>
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

					<div clasName="row">
						<div clasName="col-lg-8">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Select Country
															</label>
															<CountryDropdown
																clasName="form-control input-field"
																value={country}
																onChange={val => setCountry(val)}
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div clasName="row">
										<div clasName="col-md-12">
											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Select State
															</label>
															{/* <select
                                  name="currency"
                                  value=""
                                  clasName="form-control input-field"
                                >
                                  <option value="">--select--</option>
                                  <option value="Active">All States</option>
                                  <option value="Inactive">Assam</option>
                                  <option value="Inactive">
                                    Arunachal Pradesh
                                  </option>
                                </select> */}
															<RegionDropdown
																country={country}
																value={state}
																clasName="form-control input-field"
																onChange={val => setState(val)}
															/>
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

export default Editshipping;
