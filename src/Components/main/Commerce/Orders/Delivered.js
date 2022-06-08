import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

function Delivered() {
  const { token } = isAutheticated();
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(1);
  const [totalRes, setTotalRes] = useState(0);
  const [paginationVal, setpaginationVal] = useState(10);
  const pageNumbers = [];
  let page = 1;
  let limitVal = 10;

  for (let i = 1; i <= Math.ceil(totalRes / paginationVal); i++) {
    pageNumbers.push(i);
  }
  async function getOrders() {
    const orders = await axios.get(
      `${API}/api/order/delivered?page=${page}&limit=${limitVal}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(orders.data.orders);
    setTotalRes(orders.data.totalRecords);
  }
  useEffect(() => {
    getOrders();
  }, []);
  const getPageContent = async (e) => {
    setActive(Number(e.target.value));
    page = e.target.value * 1;
    getOrders();
  };
  const setLimitval = async (e) => {
    setpaginationVal(Number(e.target.value));
    limitVal = Number(e.target.value);
    getOrders();
  };
  function convertDate(inputFormat) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), monthNames[d.getMonth()], d.getFullYear()].join(
      " "
    );
  }
  return (
    <div clasName="main-content">
      <div clasName="page-content">
        <div clasName="container-fluid">
          <div clasName="row">
            <div clasName="col-12">
              <div
                clasName="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <h4 clasName="mb-0">Delivered Order</h4>

                <div clasName="page-title-right">
                  <ol clasName="breadcrumb m-0">
                    <li clasName="breadcrumb-item">
                      <a href="javascript: void(0);">Lev Tours</a>
                    </li>
                    <li clasName="breadcrumb-item active">
                      Order Management - Delivered Order
                    </li>
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
                    <div clasName="col-sm-12 col-md-12">
                      <div clasName="dataTables_length">
                        <label clasName="w-100">
                          Show
                          <select
                            onChange={(e) => setLimitval(e)}
                            name=""
                            clasName="
                                select-w
                                custom-select custom-select-sm
                                form-control form-control-sm
                              "
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                      </div>
                    </div>
                  </div>

                  <div clasName="table-responsive table-shoot">
                    <table clasName="table table-centered table-nowrap mb-0">
                      <thead clasName="thead-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Placed On</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((el) => {
                          return (
                            <tr>
                              <td>{el._id}</td>
                              <td>{`${el.firstName} ${el.lastName}`}</td>
                              <td>
                                <i clasName="fa fa-inr" aria-hidden="true"></i>
                                {el.Amount}
                              </td>
                              <td>{convertDate(el.createdAt)}</td>
                              <td>
                                <span
                                  clasName="
                                  badge badge-pill badge-success
                                  font-size-12
                                "
                                >
                                  {el.status}
                                </span>
                              </td>
                              <td>
                                <a href={`/view-orders/${el._id}`}>
                                  <button
                                    type="button"
                                    clasName="
                                    btn btn-primary btn-sm
                                    waves-effect waves-light
                                    btn-table
                                    ml-2
                                  "
                                  >
                                    View
                                  </button>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div clasName="row mt-20">
                    <div clasName="col-sm-12 col-md-6 mb-20">
                      <div
                        clasName="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to {totalRes<paginationVal?<>{totalRes}</>:<>{paginationVal}</>} of {totalRes} entries
                      </div>
                    </div>

                    <div clasName="col-sm-12 col-md-6">
                      <div
                        clasName="
                            dataTables_paginate
                            paging_simple_numbers
                            float-right
                          "
                      >
                        <ul clasName="pagination">
                          <li
                            clasName="
                                paginate_button
                                page-item
                                previous
                                disabled
                              "
                          >
                            <a
                              href="#"
                              aria-controls="datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              clasName="page-link"
                            >
                              Previous
                            </a>
                          </li>

                          {pageNumbers.map((page, index) => {
                            return (
                              <li
                                className={`paginate_button page-item ${
                                  active === page ? "active" : ""
                                }`}
                              >
                                <button
                                  key={index}
                                  value={page}
                                  id={page}
                                  aria-controls="datatable"
                                  data-dt-idx="1"
                                  tabIndex="0"
                                  className="page-link "
                                  onClick={(e) => getPageContent(e)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          })}
                          <li clasName="paginate_button page-item next">
                            <a href="#" tabindex="0" clasName="page-link">
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
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

export default Delivered;
