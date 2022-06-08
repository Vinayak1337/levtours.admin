import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from 'react-spinners/ClipLoader';

import Footer from '../../Footer';
function AddCategory(props) {
	const [inputText, setinputText] = useState('');
	const [category, setCategory] = useState([]);
	const [categoryImg, setCategoryImg] = useState('');
	const [categoryId, setCategoryId] = useState(null);
	//let history=useHistory();
	const [loading, setLoading] = useState(false);

	const { token } = isAutheticated();

	useEffect(() => {
		async function fetchData() {
			let res = await axios.get(`${API}/api/category`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setCategory(res.data);
		}

		fetchData();
	}, [token]);

	function getCategoryId(e) {
		let index = e.target.selectedIndex;
		let optionElement = e.target.childNodes[index];
		let optionId = optionElement.getAttribute('id');
		setCategoryId(optionId);
	}
	const handleInputText = (e) => {
		console.log(e.target.value);
		setinputText(e.target.value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		let res;

		if (categoryId) {
			res = await axios.post(
				`${API}/api/category/`,
				{
					category: inputText,
					parentId: categoryId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(res);
			if (res.data) {
				window.location = '/comsubcategory';
			}
		} else if (!categoryImg || !category) {
			swal('All Fields Are Required!');
		} else {
			const formdata = new FormData();
			formdata.append('image', categoryImg);
			formdata.append('category', inputText);
			formdata.append('status', true);
			res = await axios.post(`${API}/api/category/`, formdata, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.data) {
				window.location = '/comcategory';
			}
		}
	};

	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}

					<div className='row'>
						<div className='col-12'>
							<div className='page-title-box d-flex align-items-center justify-content-between'>
								<h4 className='mb-0'>
									{props.heading ? props.heading : 'Commerce - Categories'}
								</h4>

								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<Link to='/dashboard'>Lev Tours</Link>
										</li>
										<li className='breadcrumb-item'>
											{props.breadcrumbheading
												? props.breadcrumbheading
												: 'Commerce - Categories'}
										</li>
										<li className='breadcrumb-item'>Add New</li>
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
									<div className='row'>
										<div className='col-md-12 col-lg-6 col-xl-6'>
											<h1 className='text-left head-small'>
												{props.subheading
													? props.subheading
													: 'Add New Category'}{' '}
											</h1>

											<form>
												{props.labelTwo ? (
													<div className='row'>
														<div className='col-lg-12'>
															<div className='form-group'>
																<label
																	for='basicpill-phoneno-input'
																	className='label-100'
																>
																	{props.labelTwo}
																</label>
																<select
																	name='category'
																	className='form-control  input-field'
																	onChange={(e) => getCategoryId(e)}
																>
																	<option>--select--</option>
																	{category.map((item, index) => {
																		return (
																			<option key={index} id={item._id}>
																				{item.category}
																			</option>
																		);
																	})}
																</select>
															</div>
														</div>
													</div>
												) : null}
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																{props.labelOne
																	? props.labelOne
																	: 'Enter Category Name'}
															</label>
															<input
																type='text'
																onChange={handleInputText}
																className='form-control input-field'
																id='basicpill-phoneno-input'
															/>
														</div>
														{props.labelOne ? null : (
															<div>
																<label
																	for='basicpill-phoneno-input'
																	className='label-100'
																>
																	Upload Category Image
																</label>
																<input
																	type='file'
																	onChange={(e) =>
																		setCategoryImg(e.target.files[0])
																	}
																	className='form-control input-field mb-3'
																	id='basicpill-phoneno-input'
																/>
															</div>
														)}
													</div>
												</div>

												<div className='row'>
													<div className='col-lg-2'>
														<div className='form-group text-left'>
															<button
																onClick={submitHandler}
																type='button'
																className='btn btn-success btn-login waves-effect waves-light mr-3'
															>
																<ClipLoader loading={loading} size={18} />
																{!loading && 'Save'}
															</button>
														</div>
													</div>
													<div className='col-lg-2'>
														<div className='form-group text-left'>
															{props.labelOne ? (
																<a href='/comsubcategory'>
																	<button
																		type='button'
																		className='btn btn-success bg-light text-dark waves-effect waves-light mr-3'
																	>
																		Cancel
																	</button>
																</a>
															) : (
																<a href='/comcategory'>
																	<button
																		type='button'
																		className='btn btn-success bg-light text-dark waves-effect waves-light mr-3'
																	>
																		Cancel
																	</button>
																</a>
															)}
														</div>
													</div>
												</div>
											</form>
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

			{/* <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <script>document.write(new Date().getFullYear())</script> © SHOTT.
                        </div>

                    </div>
                </div>
            </footer> */}
			<Footer />
		</div>
	);
}

export default AddCategory;
