import React from 'react'
import { Link } from 'react-router-dom';
import Footer from "../../../Footer"
const Passengers = () => {
    return (
        <div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}
					<div className='row'>
						<div className='col-12'>
							<div className='page-title-box d-flex align-items-center justify-content-between'>
								<h4 className='mb-0'>Passengers</h4>

								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<Link to='/dashboard'>Lev Tours</Link>
										</li>
										<li className='breadcrumb-item'>Passengers</li>
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
											<div className='dataTables_length'></div>
										</div>
										<div className='col-sm-12 col-md-6'>
											<div className='dropdown d-block'>
												<a href='/client/passengers/add'>
													<button
														type='button'
														className='btn btn-primary add-btn waves-effect waves-light float-right'
													>
														<i className='fa fa-plus' aria-hidden='true'></i>{' '}
														Add Passenger
													</button>
												</a>
											</div>
										</div>
									</div>
									<div className='table-responsive table-shoot'>
										<table className='table table-centered table-nowrap mb-0'>
											<thead className='thead-light'>
												<tr>
													<th>Name</th>
													<th>Surname</th>
													<th>Passport Number</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Test</td>
													<td>2</td>
													<td>837489827</td>
													<td>
														<a href='/client/passengers/edit'>
															<button
																type='button'
																className='btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2'
															>
																Edit
															</button>
														</a>

														<button
															//   onClick={() => handleDelete(cp._id)}
															type='button'
															className='btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2'
															id='sa-params'
														>
															Delete
														</button>
													</td>
												</tr>
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

			{/* <Footer /> */}
			<Footer/>
		</div>
    )
}

export default Passengers
