import React, { useCallback, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isAutheticated } from '../../../auth/authhelper';
import axios from 'axios';
import { API } from '../../../../API';
import { useHistory, useParams } from 'react-router-dom';

function Editpage() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [page, setPage] = useState({});
	const { token } = isAutheticated();
	const { id } = useParams();
	const history = useHistory();

	const getPage = useCallback(async () => {
		const page = await axios.get(`${API}/api/page/view_page/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setPage(page.data);
		setTitle(page.data.title);
	}, [id, token]);

	useEffect(() => {
		getPage();
	}, [getPage]);

	async function handleSubmit() {
		let res = await axios.patch(
			`${API}/api/page/update_page/${id}`,
			{
				title,
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (res) {
			history.push('/page');
		}
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
								<h4 class='mb-0'>Edit New Page</h4>
								<div class='page-title-right'>
									<ol class='breadcrumb m-0'>
										<li class='breadcrumb-item'>
											<a href='/dashboard'>Dating App</a>
										</li>
										<li class='breadcrumb-item active'>Edit New Page</li>
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

								<a href='/'>
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
																placeholder={title}
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
																data={page.content}
																onChange={(event, editor) => {
																	let data = editor.getData();

																	setContent(data);
																}}
															/>
														</div>
													</div>
												</div>

												{/* <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  class="label-100"
                                >
                                  URL
                                </label>
                                <input
                                  type="text"
                                  class="form-control input-field"
                                  placeholder="URL"
                                  disabled
                                />
                                <label
                                  for="basicpill-phoneno-input"
                                  class="label-100"
                                >
                                  This URL is auto generated. This cannot be
                                  edited.
                                </label>
                              </div>
                            </div>
                          </div> */}
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

export default Editpage;
