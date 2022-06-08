import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function Tax() {
	const [taxList, settaxList] = useState([]);
	const { token } = isAutheticated();
	useEffect(() => {
		async function getTax() {
			let tax = await axios.get(`${API}/api/tax/view_tax`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			settaxList(tax.data.tax);
		}
		getTax();
	}, []);

	async function handleDelete(id) {
		let res = await axios.delete(`${API}/api/tax/delete_tax/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		if (res) {
			window.location.reload();
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
								<h4 clasName="mb-0">Configuration - Tax Rates</h4>

								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item">Configuration - Tax Rates</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-lg-12">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row ml-0 mr-0 mb-10">
										<div clasName="col-sm-12 col-md-6" />
										<div clasName="col-sm-12 col-md-6">
											<div clasName="dropdown d-block">
												<a href="/addtax">
													<button
														type="button"
														clasName="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														<i clasName="fa fa-plus" aria-hidden="true" /> Add New Tax Rate
													</button>
												</a>
											</div>
										</div>
									</div>
									<div clasName="table-responsive table-shoot">
										<table clasName="table table-centered table-nowrap mb-0">
											<thead clasName="thead-light">
												<tr>
													<th>Name</th>
													<th>Tax Rate</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Zero Tax</td>
													<td>0%</td>
													<td>&nbsp;</td>
												</tr>
												{taxList.map((tax, index) => {
													return (
														<tr key={index}>
															<td>
																{tax.name}
															</td>
															<td>
																{tax.tax}%
															</td>
															<td>
																<a href={`/tax/${tax._id}`}>
																	<button
																		type="button"
																		clasName="btn btn-primary btn-sm waves-effect waves-light btn-table ml-2">
																		Edit
																	</button>
																</a>

																<button
																	type="button"
																	clasName=" btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
																	onClick={() => handleDelete(tax._id)}
																	id="sa-params">
																	Delete
																</button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>

									<div clasName="row mt-20">
										<div clasName="col-sm-12 col-md-6 mb-20">
											<div
												clasName="dataTables_info"
												id="datatable_info"
												role="status"
												aria-live="polite">
												Showing 1 to 10 of 57 entries
											</div>
										</div>

										<div clasName="col-sm-12 col-md-6">
											<div clasName="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          ">
												<ul clasName="pagination">
													<li clasName="
                                paginate_button
                                page-item
                                previous
                                disabled
                              ">
														<a
															href="#"
															aria-controls="datatable"
															data-dt-idx="0"
															tabindex="0"
															clasName="page-link">
															Previous
														</a>
													</li>

													<li clasName="paginate_button page-item active">
														<a
															href="#"
															aria-controls="datatable"
															data-dt-idx="1"
															tabindex="0"
															clasName="page-link">
															1
														</a>
													</li>

													<li clasName="paginate_button page-item">
														<a
															href="#"
															aria-controls="datatable"
															data-dt-idx="2"
															tabindex="0"
															clasName="page-link">
															2
														</a>
													</li>

													<li clasName="paginate_button page-item">
														<a
															href="#"
															aria-controls="datatable"
															data-dt-idx="3"
															tabindex="0"
															clasName="page-link">
															3
														</a>
													</li>

													<li clasName="paginate_button page-item next">
														<a href="#" tabindex="0" clasName="page-link">
															Next
														</a>
													</li>
												</ul>
											</div>
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

export default Tax;
