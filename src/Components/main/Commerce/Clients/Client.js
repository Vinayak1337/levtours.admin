import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';
import Pagination from '../../../pagination';

function Client() {
	const [users, setUsers] = useState([]);
	const { token } = isAutheticated();
	const [totalRes, setTotalRes] = useState(0);

	const pageNumbers = [];
	const [active, setActive] = useState(1);
	const [page, setPage] = useState(1);
	const [limitVal, setLimitVal] = useState(10);
	useEffect(
		() => {
			getUsers();
		},
		[page, limitVal]
	);
	async function getUsers() {
		const user = await axios.get(
			`${API}/api/user/getUsers?page=${page}&limit=${limitVal}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		setUsers(user.data.user);
		setTotalRes(user.data.totalRecords);
	}

	function convertDate(inputFormat) {
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
	}

	async function handleAction(userID) {
		let response = await axios.get(`${API}/api/user/getUser/${userID}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (response.data.user[0].active === null || !response.data.user[0].active) {
			let response = await axios.patch(
				`${API}/api/user/updateActive/${userID}`,
				{
					active: true
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			if (response.data) {
				window.location.reload();
			}
		} else {
			let response = await axios.patch(
				`${API}/api/user/updateActive/${userID}`,
				{
					active: false
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			if (response.data) {
				window.location.reload();
			}
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
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}
					<div className="row">
						<div className="col-12">
							<div className="page-title-box d-flex align-items-center justify-content-between">
								<h4 className="mb-0">Customers</h4>

								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Lev Tours</Link>
										</li>
										<li className="breadcrumb-item">Customers</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title --> */}

					<div className="row">
						<div className="col-lg-12">
							<div className="card">
								<div className="card-body">
									<div className="row ml-0 mr-0  mb-10">
										<div className="col-sm-12 col-md-3">
											<div className="dataTables_length">
												<label className="w-100">
													Show{' '}
													<select
														name=""
														className="select-w custom-select custom-select-sm form-control form-control-sm"
														onChange={e => setLimitval(e)}>
														<option value="10">10</option>
														<option value="25">25</option>
														<option value="50">50</option>
														<option value="100">100</option>
													</select>{' '}
													entries
												</label>
											</div>
										</div>
									</div>
									<div className="table-responsive table-shoot">
										<table className="table table-centered table-nowrap mb-0">
											<thead className="thead-light">
												<tr>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Email</th>
													<th>Joined On</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{users.map(user => {
													return (
														<tr>
															<td>
																{user.firstName}
															</td>
															<td>
																{user.lastName}
															</td>
															<td>
																{user.email}
															</td>
															<td>
																{convertDate(user.createdAt)}
															</td>
															<td>
																{user.active
																	? <span className="badge badge-pill badge-success font-size-12">Live</span>
																	: <span className="badge badge-pill badge-warning font-size-12">Suspend</span>}
															</td>
															<td>
																{user.active
																	? <button
																			onClick={() => handleAction(user._id)}
																			type="button"
																			className="btn btn-warning btn-sm  waves-effect waves-light btn-table">
																			Suspend
																		</button>
																	: <button
																			onClick={() => handleAction(user._id)}
																			type="button"
																			className="btn btn-success btn-sm  waves-effect waves-light btn-table">
																			Activate
																		</button>}

																<Link to={`/client-view/${user._id}`}>
																	<button
																		type="button"
																		className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
																		id="sa-params">
																		View
																	</button>
																</Link>
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

									{/* <div className="row mt-20">
                    <div className="col-sm-12 col-md-6 mb-20">
                      <div

                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 57 entries

                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_paginate paging_simple_numbers float-right">
                        <ul className="pagination">

                          <li className="paginate_button page-item previous disabled">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabIndex="0"
                              className="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="1"
                              tabIndex="0"
                              className="page-link"
                            >
                              1
                            </a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="2"
                              tabIndex="0"
                              className="page-link"
                            >
                              2
                            </a>
                          </li>

                          <li className="paginate_button page-item ">
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="3"
                              tabIndex="0"
                              className="page-link"
                            >
                              3
                            </a>
                          </li>

                          <li className="paginate_button page-item next">
                            <a href="#" tabIndex="0" className="page-link">
                              Next
                            </a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div> */}

									{/* <!-- end table-responsive --> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- container-fluid --> */}
			</div>

			{/* <!-- End Page-content --> */}

			{/* <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <script>document.write(new Date().getFullYear())</script> © TellyTell.
                        </div>

                    </div>
                </div>
            </footer> */}
			<Footer />
		</div>
	);
}

export default Client;
