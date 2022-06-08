import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../../../../../API';
import { isAutheticated } from '../../../../../auth/authhelper';

const Instance2 = ({
	submitDetails = false,
	fetchedData = {},
	parent,
	setParent = () => null,
}) => {
	const [details, setDetails] = useState({
		contact: '',
		passportType: '',
		passportNumber: '',
		issueDate: '',
		expiryDate: '',
		issuedBy: '',
	});

	const {
		contact,
		passportType,
		passportNumber,
		issueDate,
		expiryDate,
		issuedBy,
	} = details;

	const [state, setState] = useState({
		isFormValid: false,
		isSaved: false,
	});

	const { isFormValid, isSaved } = state;

	const changeDetails = (newDetails) =>
		setDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const handleChange = ({ target: { name, value } }) =>
		changeDetails({ [name]: value });

	useEffect(() => {
		if (
			contact &&
			passportType &&
			passportNumber &&
			issueDate &&
			expiryDate &&
			issuedBy
		)
			return changeState({ isFormValid: true });

		if (isFormValid) changeState({ isFormValid: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [issueDate, passportType, expiryDate, issuedBy, contact, passportNumber]);

	useEffect(() => {
		const newObj = {};

		for (const key in details)
			if (key in fetchedData) newObj[key] = fetchedData[key];

		changeDetails(newObj);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData._id]);

	const { token } = isAutheticated();

	const handleSubmit = useCallback(async () => {
		changeState({ isSaved: true });
		const formData = new FormData();

		for (const property of Object.keys(details))
			formData.append(property, details[property]);

		const res = await axios.post(
			`${API}/api/passengers?data=2&parent=${parent}&isNew=${
				fetchedData._id ? 'false' : 'true'
			}`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) return setParent(res.data._id);
		alert('Something went wrong, try again later.');
		changeState({ isSaved: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		if (submitDetails && !isSaved) handleSubmit();
	}, [handleSubmit, isSaved, submitDetails]);

	return (
		<div class='row'>
			<div class='col-lg-12'>
				<div class='card'>
					<div class='card-body'>
						<div class='row'>
							<div class='col-md-12 col-lg-6 col-xl-6'>
								{/* <h1 class='text-left head-small'>Untitled section 2</h1> */}

								<form>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													National identity/personal number (if applicable)
												</label>
												<input
													value={contact}
													name='contact'
													onChange={handleChange}
													type='text'
													class='form-control input-field'
													id='basicpill-phoneno-input'
												/>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Type of the passport/travel document*
												</label>
												<select
													id='basicpill-phoneno-input'
													value={passportType}
													name='passportType'
													onChange={handleChange}
													class='form-control input-field'
												>
													<option value=''>--Select Document --</option>
													<option value='International'>
														International passport
													</option>
													<option value='Diplomatic'>
														Diplomatic passport
													</option>
													<option value='Service'>Service passport</option>
													<option value='Official'>Official passport</option>
													<option value='Special'>Special passport</option>
												</select>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Passport/travel document’s series/ number*
												</label>
												<input
													value={passportNumber}
													name='passportNumber'
													onChange={handleChange}
													type='text'
													class='form-control input-field'
													id='basicpill-phoneno-input'
													required
												/>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Issue date*
												</label>
												<input
													value={issueDate}
													name='issueDate'
													onChange={handleChange}
													type='date'
													class='form-control input-field'
													id='basicpill-phoneno-input'
													required
												/>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Valid until*
												</label>
												<input
													value={expiryDate}
													name='expiryDate'
													onChange={handleChange}
													type='date'
													class='form-control input-field'
													id='basicpill-phoneno-input'
													required
												/>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Issued by / authority (as indicated in the passport/
													travel document)*
												</label>
												<input
													value={issuedBy}
													name='issuedBy'
													onChange={handleChange}
													type='text'
													class='form-control input-field'
													id='basicpill-phoneno-input'
													required
												/>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group text-left'>
												<button
													disabled={!isFormValid || isSaved}
													onClick={handleSubmit}
													type='button'
													class='
                                        btn btn-success btn-login
                                        waves-effect waves-light
                                        mr-3
                                      '
												>
													Save
												</button>
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
	);
};

export default Instance2;
