import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';

function ViewClient() {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [user, setUser] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [joinDate, setJoinDate] = useState('');
	const [custId, setCustId] = useState('');
	const { token } = isAutheticated();
	useEffect(() => {
		getOrderDetails();
	}, []);
	const getOrderDetails = async () => {
		const res = await axios.get(`${API}/api/order/admin/user_order/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		setOrder(res.data);
	};
	useEffect(() => {
		async function getUser() {
			let user = await axios.get(`${API}/api/user/getUser/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(user.data.user);
			user.data.user.map(el => {
				setFirstName(el.firstName);
				setLastName(el.lastName);
				setEmail(el.email);
				setJoinDate(el.createdAt);
				setCustId(el._id);
			});
		}
		getUser();
	}, []);

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

	return (
		<div className="main-content">
			<div className="page-content">
				<div className="container-fluid">
					{/* <!-- start page title --> */}
					<div className="row">
						<div className="col-12">
							<div className="page-title-box d-flex align-items-center justify-content-between">
								<h4 className="mb-0">Customer Information</h4>
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<Link to="/dashboard">Lev Tours</Link>
										</li>
										<li className="breadcrumb-item active">Customer</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- end page title --> */}
					<div className="row">
						<div className="col-lg-12">
							<div className="card">
								<div className="card-body">
									<div className="col-sm-12 col-md-6 ml-auto mb-5">
										<div className="dropdown d-block">
											<a href="/clients">
												<button
													type="button"
													className="btn btn-login text-white add-btn waves-effect waves-light float-right">
													Back
												</button>
											</a>
										</div>
									</div>
									<div className="table-responsive table-shoot">
										<table className="table">
											<tr>
												<th>First Name</th>
												<td>
													{firstName}
												</td>
											</tr>
											<tr>
												<th>Last Name</th>
												<td>
													{lastName}
												</td>
											</tr>
											<tr>
												<th>Email</th>
												<td>
													{email}
												</td>
											</tr>
											<tr>
												<th>Mobile </th>
												<td>-</td>
											</tr>
											<tr>
												<th>Joined On</th>
												<td>
													{convertDate(joinDate)}
												</td>
											</tr>
											<tr>
												<th>Unique Client ID</th>
												<td>
													{custId}
												</td>
											</tr>
											<tr>
												<th>Orders</th>
												<td>-</td>
											</tr>
											<tr>
												<th>Address1</th>
												<td>-</td>
											</tr>
											<tr>
												<th>Address2</th>
												<td>-</td>
											</tr>
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

export default ViewClient;
