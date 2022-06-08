import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../../../../API';
import { isAutheticated } from '../../../../auth/authhelper';

function Blogs() {
	const { token } = isAutheticated();
	const [state, setState] = useState({
		blogs: [],
		page: 1,
		limit: 10,
		totalBlogs: 0,
		pages: 1,
	});
	const { blogs, page, limit, totalBlogs, pages } = state;

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const getEmailTemplates = useCallback(async () => {
		let res = await axios.get(`${API}/api/blog?page=${page}&limit=${limit}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		changeState({ ...res.data, pages: Math.ceil(res.data.totalBlogs / limit) });
	}, [limit, page, token]);

	useEffect(() => {
		getEmailTemplates();
	}, [getEmailTemplates]);

	window.scrollTo({ behavior: 'smooth', top: '0px' });

	useEffect(() => {
		changeState({ pages: totalBlogs / limit });
	}, [limit, totalBlogs]);

	const getTotalPages = useMemo(() => {
		const length = pages > 1 ? pages : totalBlogs ? 1 : 0;
		return Array.from({ length }, (_, i) => i + 1);
	}, [pages, totalBlogs]);

	async function handleDelete(id) {
		let res = await axios.delete(`${API}/api/blog/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.status === 200) window.location.reload();
	}

	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}

					<div className='row'>
						<div className='col-12'>
							<div className='page-title-box d-flex align-items-center justify-content-between'>
								<h4 className='mb-0'>Blogs</h4>

								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<Link to='/dashboard'>Lev Tours</Link>
										</li>
										<li className='breadcrumb-item'>Blogs</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- end page title --> */}

					<div className='row'>
						<div className='col-lg-12'>
							<div className='card'>
								<div className='card-body'>
									<div className='row ml-0 mr-0  mb-10'>
										<div className='col-sm-12 col-md-6'>
											<div className='dataTables_length'>
												<label className='w-100'>
													Show{' '}
													<select
														onChange={(e) =>
															changeState({ limit: e.target.value, page: 1 })
														}
														className='select-w custom-select custom-select-sm form-control form-control-sm'
													>
														<option value='10'>10</option>
														<option value='25'>25</option>
														<option value='50'>50</option>
														<option value='100'>100</option>
													</select>{' '}
													entries
												</label>
											</div>
										</div>
										<div className='col-sm-12 col-md-6'>&nbsp;</div>
										<div className='col-sm-12 col-md-6'>
											<div className='dropdown d-block'>
												<a href='/blogs/add'>
													<button
														type='button'
														className='btn btn-primary add-btn waves-effect waves-light float-right'
													>
														<i className='fa fa-plus' aria-hidden='true' /> Add
														New Blog
													</button>
												</a>
											</div>
										</div>
									</div>
									<div className='table-responsive table-shoot'>
										<table className='table table-centered table-nowrap mb-0'>
											<thead className='thead-light'>
												<tr>
													<th>Thumbnail</th>
													<th>Title</th>
													<th>Added on</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{blogs.length > 0
													? blogs.map((item) => (
															<tr key={item._id}>
																<td>
																	<img
																		src={item.thumbnail}
																		alt=''
																		style={{ height: '100px', width: 'auto' }}
																	/>
																</td>
																<td>{item.title}</td>
																<td>
																	{moment(item.createdAt).format(
																		'Do MMMM YYYY'
																	)}
																</td>
																<td>
																	<Link to={`/blogs/edit/${item._id}`}>
																		<button
																			type='button'
																			className='btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2'
																		>
																			Edit
																		</button>
																	</Link>

																	<button
																		onClick={handleDelete.bind(null, item._id)}
																		type='button'
																		className='btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2'
																		id='sa-params'
																	>
																		Delete
																	</button>
																</td>
															</tr>
													  ))
													: ''}
											</tbody>
										</table>
									</div>

									<div className='row mt-20'>
										<div className='col-sm-12 col-md-6 mb-20'>
											<div
												className='dataTables_info'
												id='datatable_info'
												role='status'
												aria-live='polite'
											>
												Showing{' '}
												{!totalBlogs ? totalBlogs : page * limit - (limit - 1)}{' '}
												to{' '}
												{totalBlogs > limit
													? limit * page > totalBlogs
														? totalBlogs
														: limit * page
													: totalBlogs}{' '}
												of {totalBlogs} entries
											</div>
										</div>

										<div className='col-sm-12 col-md-6'>
											<div className='dataTables_paginate paging_simple_numbers float-right'>
												<ul className='pagination'>
													<li
														className={`paginate_button page-item previous ${
															page < 2 ? 'disabled' : ''
														}`}
													>
														<button
															aria-controls='datatable'
															data-dt-idx='0'
															tabIndex={page - 1}
															onClick={() => changeState({ page: page - 1 })}
															className='page-link'
														>
															Previous
														</button>
													</li>

													{getTotalPages.map((pageNo) => {
														return (
															<li
																className={`paginate_button page-item ${
																	pageNo === page ? 'active' : ''
																}`}
															>
																<button
																	key={`page_no_${pageNo}`}
																	value={pageNo}
																	id={pageNo}
																	aria-controls='datatable'
																	data-dt-idx='1'
																	tabIndex='0'
																	className='page-link '
																	onClick={() => changeState({ page: pageNo })}
																>
																	{pageNo}
																</button>
															</li>
														);
													})}

													<li
														className={`paginate_button page-item next ${
															page === getTotalPages.length ? 'disabled' : ''
														}`}
													>
														<button
															onClick={() => changeState({ page: page + 1 })}
															tabIndex={page + 1}
															className='page-link'
														>
															Next
														</button>
													</li>
												</ul>
											</div>
										</div>
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
		</div>
	);
}

export default Blogs;
