import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from 'react-spinners/ClipLoader';
import Footer from '../../Footer';
import { Link } from 'react-router-dom';

function AddProducts() {
	const { token } = isAutheticated();
	const [state, setstate] = useState({
		title: '',
		description: '',
		tax: '',
		taxes: [],
		category: '',
		categories: [],
		status: '',
		featuredImage: '',
		images: '',
		price: '',
		sale_price: '',
		sku: '',
		loading: false,
	});

	const {
		title,
		description,
		tax,
		category,
		status,
		featuredImage,
		images,
		price,
		sku,
		sale_price,
		loading,
		categories,
		taxes,
	} = state;

	const changeState = newSate =>
		setstate(prevState => ({ ...prevState, ...newSate }));

	useEffect(
		() => {
			async function fetchData() {
				let res = await axios.get(`${API}/api/category`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (res.data.length > 0) {
					changeState({ categories: res.data });
				}
			}
			async function fetchTax() {
				let res = await axios.get(`${API}/api/tax/view_tax`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.data.length > 0) {
					changeState({ taxes: res.data });
				}
			}
			fetchData();
			fetchTax();
		},
		[token],
	);

	const handleSubmit = async () => {
		if (
			!(
				title ||
				description ||
				tax ||
				category ||
				status === null ||
				featuredImage ||
				images.length ||
				sku ||
				sale_price ||
				price
			)
		) {
			alert('Please fill required field ');
			return;
		}

		changeState({ loading: true });

		const formdata = new FormData();

		if (images !== null) {
			for (const key of Object.keys(images)) {
				formdata.append('images', images[key]);
			}
		} else {
			formdata.append('images', '');
		}

		if (featuredImage !== null) {
			formdata.append('featuredImage', featuredImage);
		} else {
			formdata.append('featuredImage', '');
		}

		formdata.append('title', title);
		formdata.append('description', description);
		formdata.append(
			'category',
			categories.find(item => item.category === category)._id,
		);
		formdata.append('tax', taxes.find(item => item.name === tax)._id);
		formdata.append('price', price);
		formdata.append('sale_price', sale_price);
		formdata.append('sku', sku);
		formdata.append('status', status);

		let res = await axios.post(`${API}/api/product`, formdata, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res) {
			window.location = '/comproducts';
		}
		changeState({ loading: false });
	};



	
	const onCancel = e => {
		window.location = '/comproducts';
	};

	const handleChange = e => {
		const { name, value } = e.target;

		changeState({ [name]: value });
	};

	function handleFeaturedImage(e) {
		changeState({ featuredImage: e.target.files[0] });
	}
	function handleProductImages(e) {
		changeState({ images: e.target.files });
	}

	return (
		<div className="main-content">
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}
					<div className="row">
						<div className="col-12">
							<div className="page-title-box d-flex align-items-center justify-content-between">
								<h4 className="mb-0">Add New Product</h4>
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Lev Tours</Link>
										</li>
										<li className="breadcrumb-item active">Commerce</li>
										<li className="breadcrumb-item active">Add New Product</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title --> */}

					{/* <!-- Save options Begins--> */}
					<div className="row">
						<div className="col-12">
							<div className="form-group text-right">
								<button
									onClick={handleSubmit}
									type="button"
									className="btn btn-success btn-login waves-effect waves-light mr-3">
									<ClipLoader loading={loading} size={18} />
									{!loading && 'Save'}
								</button>
								<button
									onClick={onCancel}
									type="button"
									className="btn btn-success btn-cancel waves-effect waves-light mr-3">
									Cancel
								</button>
							</div>
						</div>
					</div>
					{/* <!-- Save options Ends-->             */}

					{/* <!-- Row 1 Begins -->                */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Title*
															</label>
															<input
																type="text"
																name="title"
																className="form-control input-field"
																onChange={handleChange}
																placeholder="Title"
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group mb-30 width-100 row">
															<label className="col-md-4 control-label">Description(optional)</label>
															<div className="col-md-13">
																<textarea
																	onChange={handleChange}
																	name="description"
																	className="form-control input-field"
																	rows="5"
																	placeholder="Add description"
																/>
															</div>
														</div>
														{/* <div className="form-group">
															<label for="basicpill-phonenfo-input" className="label-100">
																Description
															</label>
															<span >
																<div id="summernote-editor" onChange={handleChangeEditor} defaultValue={state.description} ref={EditorRef} className="summernote"></div>
															</span>
														</div> */}
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends --> */}

						{/* <!--Right Column Begins --> */}
						<div className="col-lg-4">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Select Tax*
															</label>
															<select
																name="tax"
																value={state.tax}
																onChange={e => changeState({ tax: e.target.value })}
																className="form-control  input-field">
																<option value="">--select--</option>
																{taxes.length &&
																	taxes.map(item =>
																		<option value={item.name}>
																			{item.name}&nbsp;{item.tax}%
																		</option>,
																	)}
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Select Category*
															</label>
															<select
																name="category"
																value={state.category}
																onChange={e => changeState({ category: e.target.value })}
																className="form-control  input-field">
																<option value="">--select--</option>

																{categories.length &&
																	categories.map(item =>
																		<option value={item.category}>
																			{item.category}
																		</option>,
																	)}
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Status*
															</label>
															<select
																name="status"
																value={status}
																onChange={e =>
																	changeState({ status: e.target.value === 'true' ? true : false })}
																className="form-control  input-field">
																<option value="">--select--</option>
																<option value={true}>Display on Website</option>
																<option value={false}>Do Not Display on Website</option>
															</select>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!--Right Column Ends --> */}
					</div>
					{/* <!-- Row 1 Ends -->           */}

					{/* <!-- Row 2 Begins -->                */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Upload Featured Product Image*
															</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group mb-30 width-100 row">
															<label className="col-md-4 control-label">
																Upload One Image Only
																<br />
																<span className="size">(320 x 180 px)</span>
															</label>
															<div className="col-md-8">
																<input
																	accept="image/*"
																	type="file"
																	className="form-control input-field"
																	onChange={e => handleFeaturedImage(e)}
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Upload Product Images*
															</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-12">
														<div className="form-group mb-30 width-100 row">
															<label className="col-md-4 control-label">
																Upload Upto 9 Images
																<br />
																<span className="size">(320 x 180 px)</span>
															</label>
															<div className="col-md-8">
																<input
																	type="file"
																	multiple
																	accept="image/*"
																	className="form-control input-field"
																	onChange={e => handleProductImages(e)}
																/>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends --> */}
					</div>
					{/* <!-- Row 2 Ends -->  */}

					{/* <!-- Row 3 Begins -->                */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-4">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Price*
															</label>
															<input
																type="text"
																name="price"
																onChange={handleChange}
																className="form-control input-field"
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-4">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																Sale Price*
															</label>
															<input
																name="sale_price"
																onChange={handleChange}
																type="text"
																className="form-control input-field"
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends --> */}
					</div>
					{/* <!-- Row 3 Ends -->  */}

					{/* <!-- Row 4 Begins -->                */}
					<div className="row">
						{/* <!--Left Column Begins--> */}
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-12">
											<form>
												<div className="row">
													<div className="col-lg-4">
														<div className="form-group">
															<label for="basicpill-phoneno-input" className="label-100">
																SKU*
															</label>
															<input
																name="sku"
																onChange={handleChange}
																type="text"
																className="form-control input-field"
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Left Column Ends --> */}
					</div>
					{/* <!-- Row 4 Ends -->  */}
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

export default AddProducts;
