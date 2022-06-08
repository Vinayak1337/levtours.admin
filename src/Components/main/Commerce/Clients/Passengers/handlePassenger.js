import React, { useEffect, useState } from 'react';
import Footer from '../../../Footer';
import { Link, useHistory, useParams } from 'react-router-dom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PassengersInstance1 from './PassengersInstances/Instance1';
import PassengersInstance2 from './PassengersInstances/Instance2';
import PassengersInstance3 from './PassengersInstances/Instance3';
import PassengersInstance4 from './PassengersInstances/Instance4';
import axios from 'axios';
import { API } from '../../../../../API';
import { isAutheticated } from '../../../../auth/authhelper';

// const useLogger = (...values) => {
// 	useEffect(() => {
// 		console.log(...values);
// 	}, [values]);
// };

const AddPassenger = () => {
	// Create new plugin instance
	// const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const [parent, setParent] = useState(null);
	const [toSave, setToSave] = useState(false);
	const [passengerData1, setPassengerData1] = useState({});
	const [passengerData2, setPassengerData2] = useState({});
	const [passengerData3, setPassengerData3] = useState({});
	const [passengerData4, setPassengerData4] = useState({});

	const { token } = isAutheticated();

	const { id } = useParams();

	useEffect(() => {
		if (!id) return;
		setParent(id);
	}, [id]);

	const history = useHistory();

	const handleSubmit = () => {
		setToSave(true);
		history.push('/passengers');
	};

	const fetchedData1 = async () => {
		const res = await axios.get(
			`${API}/api/passengers?data=1&parent=${parent}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) setPassengerData1(res.data);
	};

	const fetchedData2 = async () => {
		const res = await axios.get(
			`${API}/api/passengers?data=2&parent=${parent}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) setPassengerData2(res.data);
	};

	const fetchedData3 = async () => {
		const res = await axios.get(
			`${API}/api/passengers?data=3&parent=${parent}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) setPassengerData3(res.data);
	};

	const fetchedData4 = async () => {
		const res = await axios.get(
			`${API}/api/passengers?data=4&parent=${parent}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (res.status === 200) setPassengerData4(res.data);
	};

	useEffect(() => {
		if (!parent) return;

		fetchedData1();
		fetchedData2();
		fetchedData3();
		fetchedData4();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parent]);

	return (
		<div className='main-content'>
			<div class='page-content'>
				<div class='container-fluid'>
					{/* Title section start */}
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
								<h4 class='mb-0'>Passengers - Add Passenger</h4>
								<div class='page-title-right'>
									<ol class='breadcrumb m-0'>
										<li class='breadcrumb-item'>
											<a href='/'>Lev Tours</a>
										</li>
										<li class='breadcrumb-item'>Passengers</li>
										<li class='breadcrumb-item'>Add</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-lg-12'>
							<div class='form-group text-right'>
								<button
									onClick={handleSubmit}
									type='button'
									class='
                                        btn btn-success
                                        waves-effect waves-light
                                        mr-3
                                      '
								>
									Submit
								</button>
								<Link to='/client/passengers'>
									<button
										onClick={history.push.bind(null, '/passengers', null)}
										type='button'
										class='
                                        btn btn-success btn-login
                                        waves-effect waves-light
                                        mr-3
                                      '
									>
										Cancel
									</button>
								</Link>
							</div>
						</div>
					</div>

					<PassengersInstance1
						fetchedData={passengerData1}
						parent={parent}
						setParent={setParent}
						submitDetails={toSave}
					/>

					<PassengersInstance2
						fetchedData={passengerData2}
						parent={parent}
						setParent={setParent}
						submitDetails={toSave}
					/>

					<PassengersInstance3
						fetchedData={passengerData3}
						parent={parent}
						setParent={setParent}
						submitDetails={toSave}
					/>

					<PassengersInstance4
						fetchedData={passengerData4}
						parent={parent}
						setParent={setParent}
						submitDetails={toSave}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AddPassenger;
