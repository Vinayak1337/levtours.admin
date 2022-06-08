import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../API';
import swal from 'sweetalert';
function Vieworder() {
	const { id } = useParams();
	const [orderDetails, setorderDetails] = useState('');
	const [orderDate, setorderDate] = useState('');
	const [status, setStatus] = useState('');
	const [currentStatus, setcurrentStatus] = useState('');

	useEffect(() => {
		async function getOrderDetails() {
			const order = await axios.get(`${API}/api/order/${id}`);
			setorderDate(order.data.order.createdAt);
			setcurrentStatus(order.data.order.status);
			setorderDetails(order.data.order);
		}
		getOrderDetails();
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
	console.log(status);
	async function handleStatus(e) {
		e.preventDefault();
		const orderStatus = await axios.patch(`${API}/api/order/update_orderStatus`, {
			id,
			status
		});
		if (orderStatus.data) {
			swal('Order Status Updated', 'Success!');
		}
	}

	return (
		<div clasName="main-content">
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
								<h4 clasName="mb-0">Order Details</h4>
								<div clasName="page-title-right">
									<ol clasName="breadcrumb m-0">
										<li clasName="breadcrumb-item">
											<a href="javascript: void(0);">POP</a>
										</li>
										<li clasName="breadcrumb-item active">Commerce</li>
										<li clasName="breadcrumb-item active">Add New Product</li>
									</ol>
								</div>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-12">
							<div clasName="form-group text-right">
								<a href="">
									<button
										onClick={e => handleStatus(e)}
										type="button"
										clasName="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      ">
										Save
									</button>
								</a>
								<a href="#">
									<button
										type="button"
										clasName="
                        btn btn-success btn-cancel
                        waves-effect waves-light
                        mr-3
                      ">
										Cancel
									</button>
								</a>
							</div>
						</div>
					</div>

					<div clasName="row">
						<div clasName="col-lg-8">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<table>
												<tr>
													<td width="125">
														<strong>Order Date</strong>
													</td>
													<td>
														{convertDate(orderDate)}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Order ID</strong>
													</td>
													<td>
														{id}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Items</strong>
													</td>
													<td>
														{orderDetails.totalQuantity}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Total Amount</strong>
													</td>
													<td>
														Rs.{orderDetails.Amount}{' '}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Address</strong>
													</td>
													<td>
														{orderDetails.appartment
															? `${orderDetails.address} ${orderDetails.appartment}`
															: orderDetails.address}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Email</strong>
													</td>
													<td>
														{orderDetails.email}
													</td>
												</tr>
												<tr>
													<td>
														<strong>Mobile</strong>
													</td>
													<td>
														{orderDetails.phone}
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div clasName="col-lg-4">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<table>
												<tr>
													<td>
														<strong style={{ marginRight: '10px' }}>Order Status</strong>
													</td>
													<td>
														{currentStatus}
													</td>
												</tr>
												<tr>
													<td>&nbsp;</td>
													<td>&nbsp;</td>
												</tr>
											</table>
										</div>
									</div>

									<div clasName="row">
										<div clasName="col-md-12">
											<form>
												<div clasName="row">
													<div clasName="col-lg-12">
														<div clasName="form-group">
															<label for="basicpill-phoneno-input" clasName="label-100">
																Change Status
															</label>
															<select
																name="currency"
																value={status}
																clasName="form-control input-field"
																onChange={e => {
																	setStatus(e.target.value);
																}}>
																<option value="">--select--</option>
																<option>Processing</option>
																<option>Dispatched</option>
																<option>Delivered</option>
																<option>Cancelled</option>
																<option>Returned</option>
															</select>
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

					<div clasName="row">
						<div clasName="col-lg-8">
							<div clasName="card">
								<div clasName="card-body">
									<div clasName="row">
										<div clasName="col-md-12">
											<div className="table-responsive table-shoot">
												<table className="table table-centered table-nowrap mb-0">
													<thead className="thead-light">
														<tr>
															<th>Product</th>
															<th>Qty</th>
															<th>Price</th>
															<th>Tax (%)</th>
															<th>Tax (Amount)</th>
															<th>Total Amount</th>
														</tr>
													</thead>
													<tbody>
														{orderDetails.product
															? orderDetails.product.map(item => {
																	return (
																		<tr>
																			<td>
																				<img src={item.image[0]} width="110" height="60" />
																			</td>
																			<td>
																				{item.quantity}
																			</td>
																			<td>
																				{item.price}
																			</td>
																			<td>
																				{item.tax.name} &nbsp; {item.tax.tax}%
																			</td>
																			<td>
																				{item.price * item.tax.tax / 100}
																			</td>
																			<td>
																				{item.price + item.price * item.tax.tax / 100}
																			</td>
																		</tr>
																	);
																})
															: ''}
													</tbody>
												</table>
											</div>
											{/* <table>
                        <tr>
                          <td width="125" align="left">
                            <strong>Product</strong>
                          </td>
                          <td width="75" align="center">
                            <strong>Qty</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Price</strong>
                          </td>
                          <td width="100" align="center">
                            <strong>Tax (%)</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Tax (Amount)</strong>
                          </td>
                          <td width="125" align="right">
                            <strong>Total Amount</strong>
                          </td>
                        </tr>
                        <tr>
                          <td width="125" align="left">
                            <img src="assets/images/mini-cart-02.jpg" />
                            <br />
                            Product name
                          </td>
                          <td width="75" align="center">
                            1
                          </td>
                          <td width="125" align="right">
                            Rs. 100.00
                          </td>
                          <td width="100" align="center">
                            5%
                          </td>
                          <td width="125" align="right">
                            Rs. 5.00
                          </td>
                          <td width="125" align="right">
                            Rs. 105.00
                          </td>
                        </tr>
                      </table> */}
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

export default Vieworder;
