import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function Viewcontact() {
	const { id } = useParams();
	let [contactinfo, setContactinfo] = useState('');
	const { token } = isAutheticated();

	function convertDate(inputFormat) {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'June',
			'July',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(' ');
	}

	useEffect(() => {
		async function getContactInfo() {
			let info = await axios.get(`${API}/api/contact/get_Contact/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setContactinfo(info.data.Contact);
			console.log(info);
		}
		getContactInfo();
	}, []);
	return (
		<div className="main-content">
			<div clasName="page-content">
				<div clasName="container-fluid">
					<div clasName="row">
						<div clasName="col-12">
							<div clasName="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  ">
								<h4 clasName="mb-0">Contact Request</h4>

								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">Lev Tours</a>
										</li>
										<li clasName="breadcrumb-item active">Data Collection - Contact Request</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-lg-12">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row ml-0 mr-0 mb-10">
										<div clasName="col-sm-12 col-md-6" />

										<div clasName="col-sm-12 col-md-6">
											<div clasName="dropdown d-block">
												<a href="/contact-request">
													<button
														type="button"
														clasName="
                                btn btn-primary
                                add-btn
                                waves-effect waves-light
                                float-right
                              ">
														Back
													</button>
												</a>
											</div>
										</div>
									</div>
									<div clasName="table-responsive table-shoot">
										<table clasName="table table-centered table-nowrap mb-0">
											<tbody>
												<tr>
													<td width="20%">
														<strong>Name</strong>
													</td>
													<td>
														{contactinfo.name}
													</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Email</strong>
													</td>
													<td>
														{contactinfo.email}
													</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Phone Number</strong>
													</td>
													<td>
														{contactinfo.phoneNumber}
													</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Message</strong>
													</td>
													<td>
														{contactinfo.message}
													</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Receieved on</strong>
													</td>
													<td>
														{convertDate(contactinfo.createdAt)}
													</td>
												</tr>

												<tr>
													<td width="20%">
														<strong>Sent From</strong>
													</td>
													<td>-</td>
												</tr>
											</tbody>
										</table>
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

export default Viewcontact;
