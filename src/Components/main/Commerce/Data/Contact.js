import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Pagination from '../../../pagination';

function Contact() {
	let { token } = isAutheticated();
	let [contact, setContact] = useState([]);
	const [totalRes, setTotalRes] = useState(0);

	const pageNumbers = [];
	const [active, setActive] = useState(1);
	const [page, setPage] = useState(1);
	const [limitVal, setLimitVal] = useState(10);
	function convertDate(inputFormat) {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'June',
			'July',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(' ');
	}

	useEffect(
		() => {
			getContactRequests();
		},
		[page, limitVal]
	);
	async function getContactRequests() {
		let contacts = await axios.get(
			`${API}/api/contact/view_Contact?page=${page}&limit=${limitVal}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log(contacts, 'CONTACT');
		setContact(contacts.data.Contact);
		setTotalRes(contacts.data.totalRecords);
	}

	async function handleDelete(id) {
		let deleted = await axios.delete(`${API}/api/contact/delete_Contact/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		console.log(deleted);
		if (deleted.data.message) {
			window.location.reload();
		}
	}
	const getPageContent = async e => {
		setActive(Number(e.target.value));
		setPage(e.target.value * 1);
	};
	const setLimitval = async e => {
		setLimitVal(Number(e.target.value));
	};
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
								<h4 clasName="mb-0">Data Management - Contact Requests</h4>

								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item">Data Management - Contact Requests</li>
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
										<div clasName="col-sm-12 col-md-6">
											<div clasName="dataTables_length">
												<label clasName="w-100">
													Show
													<select
														name=""
														clasName="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
														onChange={e => setLimitval(e)}>
														<option value="10">10</option>
														<option value="25">25</option>
														<option value="50">50</option>
														<option value="100">100</option>
													</select>
													entries
												</label>
											</div>
										</div>
										<div clasName="col-sm-12 col-md-6">
											<div clasName="dropdown d-block">
												<a href="/add-contact">
													<button
														type="button"
														clasName="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														<i clasName="fa fa-plus" aria-hidden="true" /> Add Contact Request Manually
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
													<th>Email</th>
													<th>Phone</th>
													<th>Received On</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{contact.map(item => {
													return (
														<tr>
															<td>
																{item.name}
															</td>
															<td>
																{item.email}
															</td>
															<td>
																{item.phoneNumber}
															</td>
															<td>
																{convertDate(item.createdAt)}
															</td>
															<td>
																{item.status
																	? <span clasName="
                                  badge badge-pill badge-success
                                  font-size-12
                                ">
																			read
																		</span>
																	: <span clasName="
                                  badge badge-pill badge-danger
                                  font-size-12
                                ">
																			Unread
																		</span>}
															</td>
															<td>
																<a href={`/view-contact/${item._id}`}>
																	<button
																		type="button"
																		clasName="
                                    btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  ">
																		View
																	</button>
																</a>

																<button
																	onClick={() => handleDelete(item._id)}
																	type="button"
																	clasName="
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
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
									<Pagination
										totalPosts={totalRes}
										paginate={getPageContent}
										postsPerPage={limitVal}
										active={active}
										page={page}
									/>

									{/* <div clasName="row mt-20">
                    <div clasName="col-sm-12 col-md-6 mb-20">
                      <div
                        clasName="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries
                      </div>
                    </div>

                    <div clasName="col-sm-12 col-md-6">
                      <div
                        clasName="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul clasName="pagination">
                          <li
                            clasName="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              clasName="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          <li clasName="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabindex="0"
                              clasName="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li clasName="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabindex="0"
                              clasName="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li clasName="paginate_button page-item">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabindex="0"
                              clasName="page-link"
                            >
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
                */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
