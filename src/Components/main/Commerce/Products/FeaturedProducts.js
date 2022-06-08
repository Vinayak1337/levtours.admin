import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import swal from 'sweetalert';
function FeaturedProducts() {
	const { token } = isAutheticated();
	const [FeaturedProd, setFeaturedProd] = useState([]);
	useEffect(() => {
		async function getFeaturedProd() {
			let featured = await axios.get(`${API}/api/featured`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setFeaturedProd(featured.data.featured);
		}
		getFeaturedProd();
	}, [token]);
	async function handelDelete(id) {
		let status = window.confirm('Do you want to delete');
		if (!status) {
			return;
		}
		let deletedFeatured = await axios.delete(`${API}/api/featured/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (deletedFeatured) {
			swal('Success!', 'Deletd Featured Product Successfully', 'success');

			window.location.reload();
			setTimeout(() => {
				window.stop();
			}, 2000);
		}
	}

	async function handelStatus(prodId) {
		const featured = await axios.get(`${API}/api/featured/${prodId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(featured.data.Product.status);
		if (featured.data.Product.status) {
			const formdata = new FormData();
			formdata.append('status', false);
			const updateFeatured = await axios.patch(
				`${API}/api/featured/${prodId}`,
				formdata,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (updateFeatured) {
				window.location.reload();
				setTimeout(() => {
					window.stop();
				}, 2000);
			}
		} else {
			const formdata = new FormData();
			formdata.append('status', true);
			const updateFeatured = await axios.patch(
				`${API}/api/featured/${prodId}`,
				formdata,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (updateFeatured) {
				window.location.reload();
				setTimeout(() => {
					window.stop();
				}, 2000);
			}
		}
	}
	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}
					<div className='row'>
						<div className='col-12'>
							<div className='page-title-box d-flex align-items-center justify-content-between'>
								<h4 className='mb-0'>Commerce - Featured Products</h4>

								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<Link to='/dashboard'>Lev Tours</Link>
										</li>
										<li className='breadcrumb-item'>
											Commerce - Featured Products
										</li>
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
											<div className='dataTables_length' />
										</div>
										<div className='col-sm-12 col-md-6'>
											<div className='dropdown d-block'>
												<a href='/featuredProduct/add'>
													<button
														type='button'
														style={{
															background: '#ffa300',
															border: '1px solid #ffa300',
														}}
														className='btn btn-primary add-btn waves-effect waves-light float-right'
													>
														<i className='fa fa-plus' aria-hidden='true' /> Add
														Featured Product
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
													<th>Product Name</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{FeaturedProd.map((prod, index) => {
													return (
														<tr key={index}>
															<td>
																<img
																	src={prod.image}
																	alt='thumbnail'
																	width='110'
																	height='60'
																/>
															</td>
															<td>{prod.name}</td>
															<td>
																{prod.status ? (
																	<span className='badge badge-pill badge-success font-size-12'>
																		Active
																	</span>
																) : (
																	<span className='badge badge-pill badge-danger font-size-12'>
																		Inactive
																	</span>
																)}
															</td>
															<td>
																<button
																	onClick={() => handelStatus(prod._id)}
																	type='button'
																	className={`btn ${
																		prod.status ? 'btn-warning' : 'btn-success'
																	} btn-sm  waves-effect waves-light btn-table`}
																>
																	{prod.status ? 'Suspend' : 'Activate'}
																</button>
																<a href={`/featuredProduct/edit/${prod._id}`}>
																	<button
																		type='button'
																		className='btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2'
																	>
																		Edit
																	</button>
																</a>
																<button
																	type='button'
																	className='btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2'
																	id='sa-params'
																	onClick={() => handelDelete(prod._id)}
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

export default FeaturedProducts;
