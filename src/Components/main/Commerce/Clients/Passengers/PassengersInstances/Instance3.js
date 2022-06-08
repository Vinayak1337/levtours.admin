import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { API } from '../../../../../../API';
import { isAutheticated } from '../../../../../auth/authhelper';

const Instance3 = ({
	submitDetails = false,
	fetchedData = {},
	parent,
	setParent = () => null,
}) => {
	const [details, setDetails] = useState({
		address: '',
		email: '',
		telephoneNumber: '',
	});

	const { address, email, telephoneNumber } = details;

	const [state, setState] = useState({
		isFormValid: false,
		isSaved: false,
	});

	const { isFormValid, isSaved } = state;

	const changeDetails = (newDetails) =>
		setDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const handleChange = ({ target: { name = 'null', value = '' } }) =>
		changeDetails({ [name]: value });

	useEffect(() => {
		if (address && email && telephoneNumber)
			return changeState({ isFormValid: true });

		if (isFormValid) changeState({ isFormValid: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email, address, telephoneNumber]);

	useEffect(() => {
		const newObj = {};

		for (const key in details)
			if (key in fetchedData) newObj[key] = fetchedData[key];

		changeDetails(newObj);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData._id]);

	const { token } = isAutheticated();

	const handleSubmit = useCallback(async () => {
		if (!token) return;
		changeState({ isSaved: true });
		const formData = new FormData();

		for (const property of Object.keys(details))
			formData.append(property, details[property]);

		const res = await axios.post(
			`${API}/api/passengers?data=3&parent=${parent}&isNew=${
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
								{/* <h1 class='text-left head-small'>Untitled section 3</h1> */}

								<form>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Applicant’s postal address*
												</label>
												<textarea
													value={address}
													name='address'
													onChange={handleChange}
													class='form-control input-field'
													rows='3'
													required
												></textarea>
											</div>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													E-Mail*
												</label>
												<input
													value={email}
													name='email'
													onChange={handleChange}
													type='email'
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
													Telephone number(s) including international dial
													codes:Telephone No*
												</label>
												<input
													value={telephoneNumber}
													name='telephoneNumber'
													onChange={handleChange}
													type='tel'
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

export default Instance3;
