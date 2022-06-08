import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';

function Category() {
	const { token } = isAutheticated();
	const [data, setdata] = useState([]);

	const fetchData = useCallback(
		async () => {
			let res = await axios.get(`${API}/api/category/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setdata(res.data);
		},
		[token],
	);

	useEffect(
		() => {
			fetchData();
		},
		[fetchData],
	);

	const handleDelete = async id => {
		let status = window.confirm('Do you want to delete');
		if (!status) {
			return;
		}
		let res = await axios.delete(`${API}/api/category/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res) {
			window.location.reload();
		}
	};

	const handleSuspend = async catId => {
		console.log(catId);
		let fetchCategory = await axios.get(`${API}/api/category/${catId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (fetchCategory.data.status) {
			let updated = await axios.patch(
				`${API}/api/category/${catId}`,
				{
					status: false,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (updated) {
				window.location.reload();
				setTimeout(() => {
					window.stop();
				}, 2000);
			}
		}
	};

	const handleActive = async catId => {
		console.log(catId);
		let fetchCategory = await axios.get(`${API}/api/category/${catId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!fetchCategory.data.status) {
			let updated = await axios.patch(
				`${API}/api/category/${catId}`,
				{
					status: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (updated) {
				window.location.reload();
				setTimeout(() => {
					window.stop();
				}, 2000);
			}
		}
	};

	return (
		<div className="main-content">
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}

					<div className="row">
						<div className="col-12">
							<div className="page-title-box d-flex align-items-center justify-content-between">
								<h4 className="mb-0">Commerce - Categories</h4>

								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Lev Tours</Link>
										</li>
										<li className="breadcrumb-item" />
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
										<div className="col-sm-12 col-md-6">&nbsp;</div>
										<div className="col-sm-12 col-md-6">
											<div className="dropdown d-block">
												<a href="/comcategory/add">
													<button
														type="button"
														className="btn btn-primary add-btn waves-effect waves-light float-right">
														<i className="fa fa-plus" aria-hidden="true" /> Add New
													</button>
												</a>
											</div>
										</div>
									</div>
									<div className="table-responsive table-shoot">
										<table className="table table-centered table-nowrap mb-0">
											<thead className="thead-light">
												<tr>
													<th>Category Name</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{data.length > 0
													? data.map(item =>
															<tr key={item._id}>
																<td>{item.category}</td>
																<td>{item.status ? 'Active' : 'Suspended'}</td>{' '}
																<td>
																	<Link to={`/comcategory/edit/${item._id}`}>
																		<button
																			type="button"
																			className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2">
																			Edit
																		</button>
																	</Link>

																	<button
																		onClick={() => handleDelete(item._id)}
																		type="button"
																		className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
																		id="sa-params">
																		Delete
																	</button>
																	{item.status
																		? <button
																				onClick={() => handleSuspend(item._id)}
																				type="button"
																				className="btn btn-warning btn-sm  waves-effect waves-light btn-table ml-2"
																				id="sa-params">
																				Suspend
																			</button>
																		: <button
																				onClick={() => handleActive(item._id)}
																				type="button"
																				className="btn btn-success btn-sm  waves-effect waves-light btn-table ml-2"
																				id="sa-params"
																				disabled>
																				Activate
																			</button>}
																</td>
															</tr>,
														)
													: ''}
											</tbody>
										</table>
									</div>

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
							<script>document.write(new Date().getFullYear())</script> © TellyTell
						</div>

					</div>
				</div>
			</footer> */}
			<Footer />
		</div>
	);
}

export default Category;
