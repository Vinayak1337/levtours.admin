import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import swal from 'sweetalert';

function Editproducts() {
	const { token } = isAutheticated();
	const { productId } = useParams();

	const [productdetails, setProductDetails] = useState({
		title: '',
		description: '',
		taxes: [],
		tax: '',
		categories: [],
		category: '',
		status: '',
		featuredImage: '',
		images: [],
		rawImages: [],
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
		taxes,
		categories,
		loading,
		rawImages,
	} = productdetails;

	const changeState = (newState) =>
		setProductDetails((prevState) => ({ ...prevState, ...newState }));

	const fetchCategory = useCallback(async () => {
		let res = await axios.get(`${API}/api/category`, {
			header: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.data.length) changeState({ categories: res.data });
	}, [token]);

	const fetchTaxes = useCallback(async () => {
		let res = await axios.get(`${API}/api/tax/view_tax`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.data.length) changeState({ taxes: res.data });
	}, [token]);

	const fetchProductDetails = useCallback(async () => {
		let product = await axios.get(`${API}/api/product/${productId}`, {
			header: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (product.status === 200) changeState({ ...product.data });
	}, [productId, token]);

	useEffect(() => {
		fetchTaxes();
		fetchCategory();
		fetchProductDetails();
	}, [fetchCategory, fetchProductDetails, fetchTaxes]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		changeState({ [name]: value });
	};

	const handleSubmit = async () => {
		// if (

		//     title === "" ||
		//     description ===""||
		//     tax ==="" ||
		//     category === [] ||
		//     status === "" ||
		//     featuredImage ==="" ||
		//     images.length ||
		//     sku ||
		//     sale_price ||
		//     price

		// ) {
		//   alert('Please fill required field ');
		//   return;
		// }

		const formdata = new FormData();

		if (rawImages.length)
			for (const image of Object.values(images))
				formdata.append('images', image);
		else formdata.append('images', '');

		if (typeof featuredImage === 'object')
			formdata.append('featuredImage', featuredImage);
		else formdata.append('featuredImage', '');

		formdata.append('title', title);
		formdata.append('description', description);
		formdata.append(
			'category',
			typeof category === 'string'
				? categories.find((item) => item.category === category)?._id
				: category._id
		);
		formdata.append(
			'tax',
			typeof tax === 'string'
				? taxes.find((item) => item.name === tax)?._id
				: tax._id
		);
		formdata.append('price', price);
		formdata.append('sale_price', sale_price);
		formdata.append('sku', sku);
		formdata.append('status', status);

		let res = await axios.patch(`${API}/api/product/${productId}`, formdata, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.status === 200) window.location = '/comproducts';
		else swal(res.status, res.data);
	};

	const handleFeaturedImage = (e) =>
		changeState({ featuredImage: e.target.files[0] });

	const handleProductImages = (e) => changeState({ rawImages: e.target.files });

	const deleteFeaturedImage = async () => {
		const res = await axios.delete(
			`${API}/api/product/deleteFeaturedImage/${productId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (res.status === 200) window.location.reload();
	};

	const deleteImage = async (url) => {
		const res = await axios.delete(
			`${API}/api/product/deleteImage/${productId}?url='${url}'`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (res.status === 200) window.location.reload();
	};

	const allImages = useMemo(() => {
		return images.concat(rawImages);
	}, [images, rawImages]);

	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}
					<div className='row'>
						<div className='col-12'>
							<div className='page-title-box d-flex align-items-center justify-content-between'>
								<h4 className='mb-0'>Edit Product</h4>
								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<Link to='/dashboard'>Lev Tours</Link>
										</li>
										<li className='breadcrumb-item active'>Commerce</li>
										<li className='breadcrumb-item active'>Edit Product</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title --> */}

					{/* <!-- Save options Begins--> */}
					<div className='row'>
						<div className='col-12'>
							<div className='form-group text-right'>
								<button
									onClick={handleSubmit}
									type='button'
									className='btn btn-success btn-login waves-effect waves-light mr-3'
								>
									{' '}
									Save
									<ClipLoader loading={loading} size={18} />
									{!loading && 'Save'}
								</button>
								<Link to='/comproducts'>
									<button
										type='button'
										className='btn btn-success btn-cancel waves-effect waves-light mr-3'
									>
										Cancel
									</button>
								</Link>
							</div>
						</div>
					</div>
					{/* <!-- Save options Ends-->             */}

					{/* <!-- Row 1 Begins -->                */}
					<div className='row'>
						{/* <!--Left Column Begins--> */}
						<div className='col-lg-8'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-12'>
											<form>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Title
															</label>
															<input
																name='title'
																value={title}
																type='text'
																onChange={handleChange}
																className='form-control input-field'
																placeholder='Title'
															/>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='form-group mb-30 width-100 row'>
														<label className='col-md-4 control-label'>
															Description
														</label>
														<div className='col-md-13'>
															<textarea
																value={description}
																name='description'
																onChange={handleChange}
																className='form-control input-field'
																rows='5'
																placeholder='Add description'
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

						{/* <!--Right Column Begins --> */}
						<div className='col-lg-4'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-12'>
											<form>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Select Tax*
															</label>
															<select
																name='tax'
																value={tax.name || tax}
																onClick={handleChange}
																className='form-control  input-field'
															>
																<option value=''>--select--</option>
																{taxes.length &&
																	taxes.map((item) => (
																		<option value={item.name}>
																			{item.name}&nbsp;{item.tax}%
																		</option>
																	))}
															</select>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Select Category
															</label>
															<select
																name='category'
																value={category.category || category}
																className='form-control  input-field'
																onChange={handleChange}
															>
																<option value=''>--select--</option>

																{categories.length &&
																	categories.map((item) => (
																		<option value={item.category}>
																			{item.category}
																		</option>
																	))}
															</select>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Status
															</label>
															<select
																name='status'
																value={
																	status
																		? 'Display on Website'
																		: 'Do Not Display on Website'
																}
																className='form-control  input-field'
																onChange={(e) =>
																	changeState({
																		status:
																			e.target.value.startsWith('Display'),
																	})
																}
															>
																<option value=''>--select--</option>
																<option value='Display on Website'>
																	Display on Website
																</option>
																<option value='Do Not Display on Website'>
																	Do Not Display on Website
																</option>
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
					<div className='row'>
						{/* <!--Left Column Begins--> */}
						<div className='col-lg-8'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-12'>
											<form>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Upload Featured Product Image*
															</label>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group mb-30 width-100 row'>
															<label className='col-md-4 control-label'>
																Upload One Image Only
																<br />
																<span className='size'>(320 x 180 px)</span>
															</label>
															<div className='col-md-8'>
																<input
																	accept='image/*'
																	type='file'
																	onChange={handleFeaturedImage}
																	className='form-control input-field'
																/>
																<div>
																	<div>
																		{featuredImage != null && (
																			<div>
																				<img
																					src={featuredImage}
																					className='w-50 mt-3'
																					alt='featured'
																				/>
																				<div
																					className='btn btn-danger ml-5'
																					onClick={deleteFeaturedImage}
																				>
																					Delete
																				</div>
																			</div>
																		)}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Upload Product Images*
															</label>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group mb-30 width-100 row'>
															<label className='col-md-4 control-label'>
																Upload Upto 9 Images
																<br />
																<span className='size'>(320 x 180 px)</span>
															</label>
															<div className='col-md-8'>
																<input
																	type='file'
																	multiple
																	accept='image/*'
																	className='form-control input-field'
																	onChange={handleProductImages}
																/>

																{allImages.length > 0
																	? allImages.map((img, index) => {
																			return (
																				<div key={`images-${index}`}>
																					<img
																						key={index}
																						src={img}
																						className='w-25 mt-3'
																						alt='pic'
																					/>
																					{typeof img === 'string' ? (
																						<div
																							className='btn btn-danger'
																							onClick={deleteImage.bind(
																								null,
																								img
																							)}
																						>
																							Delete
																						</div>
																					) : (
																						''
																					)}
																				</div>
																			);
																	  })
																	: null}
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
					<div className='row'>
						{/* <!--Left Column Begins--> */}
						<div className='col-lg-8'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-12'>
											<form>
												<div className='row'>
													<div className='col-lg-4'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Price
															</label>
															<input
																type='text'
																value={price}
																name='price'
																onChange={handleChange}
																className='form-control input-field'
															/>
														</div>
													</div>
												</div>
												<div className='row'>
													<div className='col-lg-4'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																Sale Price
															</label>
															<input
																name='sale_price'
																value={sale_price}
																onChange={handleChange}
																type='text'
																className='form-control input-field'
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
					<div className='row'>
						{/* <!--Left Column Begins--> */}
						<div className='col-lg-8'>
							<div className='card'>
								<div className='card-body'>
									<div className='row'>
										<div className='col-md-12'>
											<form>
												<div className='row'>
													<div className='col-lg-4'>
														<div className='form-group'>
															<label
																for='basicpill-phoneno-input'
																className='label-100'
															>
																SKU
															</label>
															<input
																name='sku'
																value={sku}
																type='text'
																onChange={handleChange}
																className='form-control input-field'
															/>
														</div>
													</div>
												</div>
												{/* <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Quantity Available
                              </label>
                              <input
                                name="quantity"
                                value={state.quantity}
                                onChange={handleChange}
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div> */}
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

			<Footer />
		</div>
	);
}

export default Editproducts;
