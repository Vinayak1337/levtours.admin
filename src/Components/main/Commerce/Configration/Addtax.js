import axios from 'axios';
import React, { useState } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
function Addtax() {
	const [name, setName] = useState('');
	const [tax, setTax] = useState('');
	const { token } = isAutheticated();
	async function handleSubmit() {
		let res = await axios.post(
			`${API}/api/tax/add_tax`,
			{
				name,
				tax
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		if (res) {
			window.location.href = '/tax';
		}
	}
	return (
		<div clasName="main-content">
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
								<h4 clasName="mb-0">Add New Tax Rate</h4>
								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item active">Configuration</li>
										<li clasName="breadcrumb-item active">Add New Tax Rate</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-12">
							<div clasName="form-group text-right">
								<button
									onClick={handleSubmit}
									type="button"
									clasName="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      ">
									Save
								</button>

								<a href="#">
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
																Name
															</label>
															<input
																value={name}
																onChange={e => setName(e.target.value)}
																type="text"
																clasName="form-control input-field"
															/>
															<label for="basicpill-phoneno-input" clasName="label-100">
																This name is for your reference.
															</label>
														</div>
													</div>
												</div>

												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Tax Rate (in %)
															</label>
															<input
																value={tax}
																onChange={e => setTax(e.target.value)}
																type="text"
																clasName="form-control input-field"
															/>
															<label for="basicpill-phoneno-input" clasName="label-100">
																This tax rate will be applicable to the products you select.
															</label>
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

export default Addtax;
