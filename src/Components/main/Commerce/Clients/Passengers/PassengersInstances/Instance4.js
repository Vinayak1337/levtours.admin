import React, { useCallback, useEffect, useState } from 'react';
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from '@material-ui/core';
import ImgOrPdf from './ImgOrPdf';
import { isAutheticated } from '../../../../../auth/authhelper';
import axios from 'axios';
import { API } from '../../../../../../API';

const Instance4 = ({
	submitDetails = false,
	fetchedData = {},
	parent,
	setParent = () => null,
}) => {
	const [details, setDetails] = useState({
		entries: '',
		stayFrom: '',
		stayUntil: '',
		purposeOfStay: '',
		passportSecondPage: null,
		passportFirstPage: null,
		returnTicket: null,
		hotelBooking: null,
		insurance: null,
		financial: null,
	});

	const { entries, purposeOfStay, stayFrom, stayUntil } = details;

	const [state, setState] = useState({
		isFormValid: false,
		isSaved: false,
		passportFirstPagePreview: null,
		passportSecondPagePreview: null,
		returnTicketPreview: null,
		hotelBookingPreview: null,
		insurancePreview: null,
		financialPreview: null,
	});

	const {
		isFormValid,
		isSaved,
		passportFirstPagePreview,
		passportSecondPagePreview,
		returnTicketPreview,
		hotelBookingPreview,
		financialPreview,
		insurancePreview,
	} = state;

	const changeDetails = (newDetails) =>
		setDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));

	const changeState = (newState) =>
		setState((prevState) => ({ ...prevState, ...newState }));

	const handleChange = ({ target: { name, value = '', files = [] } }) => {
		if (!name) return;
		if (files?.length) return changeDetails({ [name]: files[0] });
		changeDetails({ [name]: value });
	};

	useEffect(() => {
		if (
			entries &&
			purposeOfStay &&
			stayFrom &&
			stayUntil &&
			passportFirstPagePreview &&
			passportSecondPagePreview &&
			returnTicketPreview &&
			hotelBookingPreview &&
			financialPreview &&
			insurancePreview
		)
			return changeState({ isFormValid: true });

		if (isFormValid) changeState({ isFormValid: false });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		entries,
		stayFrom,
		purposeOfStay,
		stayUntil,
		passportFirstPagePreview,
		passportSecondPagePreview,
		returnTicketPreview,
		hotelBookingPreview,
		financialPreview,
		insurancePreview,
	]);

	useEffect(() => {
		const properties = ['entries', 'stayFrom', 'stayUntil', 'purposeOfStay'];
		const previewProperties = [
			'passportFirstPagePreview',
			'passportSecondPagePreview',
			'hotelBookingPreview',
			'financialPreview',
			'insurancePreview',
			'returnTicketPreview',
		];
		const newObj = {};
		const previewObj = {};

		for (const property of properties)
			if (fetchedData[property]) newObj[property] = fetchedData[property];

		changeDetails({ ...newObj });

		for (const property of previewProperties)
			if (fetchedData[property.replace('Preview', '')])
				previewObj[property] = fetchedData[property.replace('Preview', '')];

		changeState({ ...previewObj });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData._id]);

	const { token } = isAutheticated();

	const handleSubmit = useCallback(async () => {
		changeState({ isSaved: true });
		const formData = new FormData();

		for (const property of Object.keys(details))
			formData.append(property, details[property]);

		const res = await axios.post(
			`${API}/api/passengers?data=4&parent=${parent}&isNew=${
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

	const handleDocumentChange = ({ name, file, url }) => {
		changeDetails({ [name]: file });
		changeState({ [`${name}Preview`]: url });
	};

	return (
		<div class='row'>
			<div class='col-lg-12'>
				<div class='card'>
					<div class='card-body'>
						<div class='row'>
							<div class='col-md-12 col-lg-6 col-xl-6'>
								{/* <h1 class='text-left head-small'>Untitled section 4</h1> */}

								<form>
									<div class='row'>
										<div class='col-lg-12'>
											<FormControl component='fieldset'>
												<FormLabel
													component='legend'
													style={{ color: '#777777' }}
												>
													Purpose of travel/stay*
												</FormLabel>
												<RadioGroup
													aria-label='gender'
													value={purposeOfStay}
													onChange={handleChange}
													name='purposeOfStay'
													row
												>
													<FormControlLabel
														value='C-06 - Tourism'
														control={<Radio />}
														label='C-06 - Tourism'
													/>
													<FormControlLabel
														value='C-02 - Private Visit'
														control={<Radio />}
														label='C-02 - Private Visit'
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
													Number of entries*{' '}
												</FormLabel>
												<RadioGroup
													aria-label='gender'
													value={entries}
													name='entries'
													onChange={handleChange}
													row
												>
													<FormControlLabel
														value='one'
														control={<Radio />}
														label='One'
													/>
													<FormControlLabel
														value='two'
														control={<Radio />}
														label='Two'
													/>
												</RadioGroup>
											</FormControl>
										</div>
									</div>
									<div class='row'>
										<div class='col-lg-12'>
											<div class='form-group'>
												<label for='basicpill-phoneno-input' class='label-100'>
													Intended date(s) of stay in Ukraine (From)*
												</label>
												<input
													value={stayFrom}
													name='stayFrom'
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
													Intended date(s) of stay in Ukraine(Until)*
												</label>
												<input
													value={stayUntil}
													name='stayUntil'
													onChange={handleChange}
													type='date'
													class='form-control input-field'
													id='basicpill-phoneno-input'
													required
												/>
											</div>
										</div>
									</div>
									<ImgOrPdf
										url={returnTicketPreview}
										label='Upload Confirmed Return Tickets*'
										name='returnTicket'
										handleChange={handleDocumentChange}
									/>
									<ImgOrPdf
										url={hotelBookingPreview}
										label='Upload Hotel Booking*'
										name='hotelBooking'
										handleChange={handleDocumentChange}
									/>
									<ImgOrPdf
										url={insurancePreview}
										label='Upload Insurance*'
										name='insurance'
										handleChange={handleDocumentChange}
									>
										<span
											style={{
												color: '#777777',
												fontSize: '12px',
												fontWeight: 400,
												lineHeight: '16px',
												marginBottom: '10px',
												marginTop: '0px !important',
											}}
										>
											Insurance must be minimum €30,000 issued by a company who
											has an official representative office in Ukraine or by a
											Ukrainian Insurance Company. The Policy MUST specifically
											mention COVID-19 Cover.
										</span>
									</ImgOrPdf>
									<ImgOrPdf
										url={financialPreview}
										label='Upload Financial*'
										name='financial'
										handleChange={handleDocumentChange}
									>
										<span
											style={{
												color: '#777777',
												fontSize: '12px',
												fontWeight: 400,
												lineHeight: '16px',
												marginBottom: '10px',
												marginTop: '0px !important',
											}}
										>
											Min €100 per day plus one day. Eg if trip is 07 days then
											min balance should be €800 in equivalent currency.
											Statement must contain bank credentials. Official ATM Mini
											Statement containing bank Logo is also allowed.
										</span>
									</ImgOrPdf>
									<ImgOrPdf
										url={passportFirstPagePreview}
										label='Upload Passport First Page Scan*'
										name='passportFirstPage'
										handleChange={handleDocumentChange}
									/>
									<ImgOrPdf
										url={passportSecondPagePreview}
										label='Upload Passport Last Page Scan*'
										name='passportSecondPage'
										handleChange={handleDocumentChange}
									/>

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

export default Instance4;
