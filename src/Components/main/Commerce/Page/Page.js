import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function Page() {
	const [page, setPage] = useState([]);
	const { token } = isAutheticated();

	useEffect(() => {
		async function getServices() {
			let pages = await axios.get(`${API}/api/page/view_page?page=1&limit=10`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPage(pages.data.pages);
		}
		getServices();
	}, [token]);

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
			'Dec',
		];
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(
			' '
		);
	}

	// delete data from Api
	async function handleDelete(id) {
		let res = await axios.delete(`${API}/api/page/delete_page/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res) {
			window.location.reload();
		}
	}

	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-12'>
							<div
								className='
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  '
							>
								<h4 className='mb-0'>Pages</h4>

								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<a href='/'>Lev Tours</a>
										</li>
										<li className='breadcrumb-item'>Pages</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-lg-12'>
							<div className='card'>
								<div className='card-body'>
									<div className='row ml-0 mr-0 mb-10'>
										<div className='col-sm-12 col-md-6' />
										<div className='col-sm-12 col-md-6'>
											<div className='dropdown d-block'>
												<a href='/page/add'>
													<button
														type='button'
														className='
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
								float-right
                              '
													>
														<i className='fa fa-plus' aria-hidden='true' /> Add
														New Page
													</button>
												</a>
											</div>
										</div>
									</div>
									<div className='table-responsive table-shoot'>
										<table className='table table-centered table-nowrap mb-0'>
											<thead className='thead-light'>
												<tr>
													<th>Title</th>
													<th>Added On</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{page.map((el) => {
													return (
														<tr>
															<td>{el.title}</td>
															<td>{convertDate(el.createdAt)}</td>
															<td>
																{' '}
																<a href={`/page/edit/${el._id}`}>
																	<button
																		type='button'
																		className='
                                    btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                	ml-2
                                  '
																	>
																		Edit
																	</button>
																</a>
																<button
																	type='button'
																	className='
                                    btn btn-danger btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  '
																	id='sa-params'
																	onClick={() => handleDelete(el._id)}
																>
																	Delete
																</button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
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

export default Page;
