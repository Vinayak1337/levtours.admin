import React, { useState } from 'react';
import sulgify from 'slugify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import { useHistory } from 'react-router-dom';

function Pageadd() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { token } = isAutheticated();
	const history = useHistory();

	async function handleSubmit() {
		let res = await axios.post(
			`${API}/api/page/add_page`,
			{
				title,
				content: content,
				url: `/${sulgify(title)}`,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (res.status === 200) history.push('/page');
	}
	return (
		<div class='main-content'>
			<div class='page-content'>
				<div class='container-fluid'>
					<div class='row'>
						<div class='col-12'>
							<div
								class='
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  '
							>
								<h4 class='mb-0'>Add New Page</h4>
								<div class='page-title-right'>
									<ol class='breadcrumb m-0'>
										<li class='breadcrumb-item'>
											<a href='/dashboard'>Dating App</a>
										</li>
										<li class='breadcrumb-item active'>Configuration</li>
										<li class='breadcrumb-item active'>Add New Tax Rate</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div class='row'>
						<div class='col-12'>
							<div class='form-group text-right'>
								<button
									type='button'
									class='
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      '
									onClick={handleSubmit}
								>
									Save
								</button>

								<a href='/page'>
									<button
										type='button'
										class='
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

					<div class='row'>
						<div class='col-lg-8'>
							<div class='card'>
								<div class='card-body'>
									<div class='row'>
										<div class='col-md-12'>
											<form>
												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																Title
															</label>
															<input
																value={title}
																onChange={(e) => setTitle(e.target.value)}
																type='text'
																class='form-control input-field'
															/>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																This is for your reference. This will not be
																displayed in web page
															</label>
														</div>
													</div>
												</div>

												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																Body
															</label>
															<CKEditor
																editor={ClassicEditor}
																data={content}
																onChange={(event, editor) => {
																	let data = editor.getData();

																	setContent(data);
																}}
															/>
														</div>
													</div>
												</div>

												<div class='row'>
													<div class='col-lg-12'>
														<div class='form-group'>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																URL
															</label>
															<input
																value={`/${title.toLowerCase()}`}
																type='text'
																class='form-control input-field'
																placeholder='URL'
																disabled
															/>
															<label
																for='basicpill-phoneno-input'
																class='label-100'
															>
																This URL is auto generated. This cannot be
																edited.
															</label>
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
			</div>
		</div>
	);
}

export default Pageadd;
