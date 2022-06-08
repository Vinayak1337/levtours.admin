import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../../../../../API';
import { isAutheticated } from '../../../../auth/authhelper';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddBlog() {
	const { token } = isAutheticated();
	const [state, setState] = useState({
		title: '',
		content: '',
		thumbnail: '',
		isValid: false,
		isLoading: false,
	});
	const { title, content, thumbnail, isValid, isLoading } = state;

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	useEffect(() => {
		if (title && thumbnail && content) return changeState({ isValid: true });
		else if (isValid) changeState({ isValid: false });
	}, [title, content, thumbnail, isValid]);

	const handleSubmit = async () => {
		changeState({ isValid: false, isLoading: true });
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		formData.append(
			'thumbnail',
			typeof thumbnail === 'string' ? '' : thumbnail
		);

		const res = await axios.post(`${API}/api/blog`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status === 200) window.location = '/blogs';
	};

	return (
		<div className='main-content'>
			<div className='page-content'>
				<div className='container-fluid'>
					{/* <!-- start page title --> */}

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
								<h4 className='mb-0'>Add New Blog</h4>
								<div className='page-title-right'>
									<ol className='breadcrumb m-0'>
										<li className='breadcrumb-item'>
											<a href='/dashboard'>Lev Tours</a>
										</li>
										<li className='breadcrumb-item active'>Blogs</li>
										<li className='breadcrumb-item active'>Add New Blog</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					{/* Save options */}
					<div className='row'>
						<div className='col-12'>
							<div className='form-group text-right'>
								<button
									type='button'
									className='
                          btn btn-success btn-login
                          waves-effect waves-light
                          mr-3
                        '
									onClick={handleSubmit}
									disabled={!isValid}
								>
									Save
								</button>

								<a href='/blogs'>
									<button
										disabled={isLoading}
										type='button'
										className='
                          btn btn-success btn-cancel
                          waves-effect waves-light
                          mr-3
                        '
									>
										Cancel
									</button>
								</a>
							</div>
						</div>
					</div>

					{/* Row 1 */}
					<div className='row'>
						{/* Column Left */}
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
																value={title}
																onChange={(e) =>
																	changeState({ title: e.target.value })
																}
																type='text'
																className='form-control input-field'
															/>
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
																Body
															</label>
															<CKEditor
																editor={ClassicEditor}
																data={content}
																onChange={(_event, editor) => {
																	const data = editor.getData();
																	changeState({ content: data });
																}}
															/>
														</div>
													</div>
												</div>

												<div className='row'>
													<div className='col-lg-12'>
														<div className='form-group mb-30 width-100 row'>
															<label className='col-md-4 control-label'>
																Upload Thumbnail
																<br />
															</label>
															<div className='col-md-8'>
																<input
																	accept='image/*'
																	type='file'
																	className='form-control input-field'
																	onChange={(e) =>
																		changeState({
																			thumbnail: e.target.files[0],
																		})
																	}
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
					</div>
				</div>
				{/* <!-- container-fluid --> */}
			</div>
			{/* <!-- End Page-content --> */}
		</div>
	);
}

export default AddBlog;
