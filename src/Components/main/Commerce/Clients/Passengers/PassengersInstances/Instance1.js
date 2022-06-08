import React, { useCallback, useEffect, useState } from 'react';
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from '@material-ui/core';
import axios from 'axios';
import { API } from '../../../../../../API';
import { isAutheticated } from '../../../../../auth/authhelper';

const Instance1 = ({
	submitDetails = false,
	fetchedData = {},
	parent = '',
	setParent = () => null,
}) => {
	const [details, setDetails] = useState({
		photo: '',
		surname: '',
		otherSurname: '',
		name: '',
		dateOfBirth: '',
		placeOfBirth: '',
		citizenship: '',
		gender: '',
		maritalStatus: '',
		mealPreference: '',
	});

	const {
		photo,
		surname,
		otherSurname,
		name,
		dateOfBirth,
		placeOfBirth,
		citizenship,
		gender,
		maritalStatus,
		mealPreference,
	} = details;

	const [state, setState] = useState({
		previewPhoto: '',
		invalidPhoto: false,
		isFormValid: false,
		isSaved: false,
	});

	const { previewPhoto, invalidPhoto, isFormValid, isSaved } = state;

	const changeDetails = (newDetails) =>
		setDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const handleChange = ({ target: { name, value = '', files = [] } }) => {
		if (!name) return;
		if (files?.length) return changeDetails({ [name]: files[0] });
		changeDetails({ [name]: value });
	};

	const removePhoto = () => {
		changeDetails({ photo: '' });
		changeState({ previewPhoto: '', invalidPhoto: false });
	};

	useEffect(() => {
		if (
			previewPhoto &&
			surname &&
			otherSurname &&
			name &&
			dateOfBirth &&
			placeOfBirth &&
			citizenship &&
			gender &&
			maritalStatus &&
			mealPreference
		)
			return changeState({ isFormValid: true, isSaved: false });

		if (isFormValid) changeState({ isFormValid: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		citizenship,
		dateOfBirth,
		gender,
		maritalStatus,
		mealPreference,
		name,
		otherSurname,
		placeOfBirth,
		previewPhoto,
		surname,
	]);

	useEffect(() => {
		const newObj = {};

		for (const key in details)
			if (key in fetchedData) newObj[key] = fetchedData[key];

		changeDetails({ ...newObj, photo: '' });
		if (newObj.photo) changeState({ previewPhoto: newObj.photo });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData._id]);

	const { token } = isAutheticated();

	const handleSubmit = useCallback(async () => {
		changeState({ isSaved: true });
		const formData = new FormData();

		for (const property of Object.keys(details))
			formData.append(property, details[property]);

		const res = await axios.post(
			`${API}/api/passengers?data=1&parent=${parent}&isNew=${
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
		if (!photo) return changeState({ previewPhoto: '' });

		changeState({ previewPhoto: URL.createObjectURL(photo) });
	}, [photo]);

	useEffect(() => {
		if (submitDetails && !isSaved) handleSubmit();
	}, [handleSubmit, isSaved, submitDetails]);

	return (
		<div class='row'>
			<div class='col-lg-12'>
				<div class='card'>
					<div class='card-body'>
						<div class='row'>
							<h1 class='text-left head-small'>
								Ukraine Visa Application Form
							</h1>
							<p className='mt-0'>
								Please note that all responses have to be in English Latin
								Script and EXACTLY as per Passport. Lev Tours will not be
								responsible for visa rejections if information on the form is
								incorrect.{' '}
							</p>
							<div class='col-md-12 col-lg-6 col-xl-6'>
								{/* <h1 class='text-left head-small'>Untitled section 1</h1> */}
								<form>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='photo' class='label-100'>
													Upload Passport Size Photo (One Image Only)*
												</label>
												<input
													type='file'
													name='photo'
													class='form-control input-field'
													id='photo'
													accept='image/*'
													required
													onChange={handleChange}
												/>
												<span>(only Image of 1 mb allowed)</span>
												{invalidPhoto && (
													<p style={{}}>File is not Supported</p>
												)}
											</div>

											{previewPhoto && (
												<>
													<img
														src={previewPhoto}
														style={{ height: '200px', width: '200px' }}
														alt=''
													/>
													<div
														style={{ marginTop: 5 }}
														className='btn btn-danger ml-5'
														onClick={removePhoto}
													>
														Delete
													</div>
												</>
											)}
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Surname(s) (according to the passport)*
												</label>
												<input
													name='surname'
													value={surname}
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
													Surname(s) / Family name(s) at birth / Previous
													surname(s)/family name(s)
												</label>
												<input
													name='otherSurname'
													value={otherSurname}
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
													Name(s) (according to the passport)*
												</label>
												<input
													name='name'
													value={name}
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
													Date of birth (day-month-year)*
												</label>
												<input
													name='dateOfBirth'
													value={dateOfBirth}
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
													Place of birth*
												</label>
												<input
													name='placeOfBirth'
													value={placeOfBirth}
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
													Citizenship (as indicated in the passport/travel
													document)*
												</label>
												<input
													name='citizenship'
													value={citizenship}
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
											<FormControl component='fieldset'>
												<FormLabel
													component='legend'
													style={{ color: '#777777' }}
												>
													Gender*
												</FormLabel>
												<RadioGroup
													aria-label='gender'
													name='gender'
													value={gender}
													onChange={handleChange}
													row
												>
													<FormControlLabel
														value='female'
														control={<Radio />}
														label='Female'
													/>
													<FormControlLabel
														value='male'
														control={<Radio />}
														label='Male'
													/>
													<FormControlLabel
														value='other'
														control={<Radio />}
														label='Other'
													/>
												</RadioGroup>
											</FormControl>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<FormControl component='fieldset'>
												<FormLabel
													component='legend'
													style={{ color: '#777777' }}
												>
													Marital status*{' '}
												</FormLabel>
												<RadioGroup
													aria-label='maritalStatus'
													name='maritalStatus'
													value={maritalStatus}
													onChange={handleChange}
													row
												>
													<FormControlLabel
														value='single'
														control={<Radio />}
														label='Single'
													/>
													<FormControlLabel
														value='married'
														control={<Radio />}
														label='Married'
													/>
													<FormControlLabel
														value='divorced'
														control={<Radio />}
														label='Divorced'
													/>
													<FormControlLabel
														value='widow'
														control={<Radio />}
														label='Widower/Widow'
													/>
												</RadioGroup>
											</FormControl>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Meal Preference*
												</label>
												<select
													id='basicpill-phoneno-input'
													class='form-control input-field'
													name='mealPreference'
													value={mealPreference}
													onChange={handleChange}
												>
													<option value=''>--Select Meal--</option>
													<option value='veg'>Vegetarian</option>
													<option value='non-veg'>Non-vegetarian</option>
												</select>
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

export default Instance1;
