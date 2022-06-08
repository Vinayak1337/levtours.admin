import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

function Coupon() {

  let [coupon, setCoupon] = useState([]);

  const { token } = isAutheticated();

  useEffect(() => {
    async function getCoupons() {
      let coupons = await axios.get(`${API}/api/coupon`);
      setCoupon(coupons.data.data);
    }
    getCoupons();
  }, []);

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

  async function handleDelete(id) {
    let deleted = await axios.delete(`${API}/api/coupon/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (deleted.data) {
      window.location.reload();
    }
  }
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Commerce - Coupon</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Lev Tours</Link>
                    </li>
                    <li className="breadcrumb-item">Commerce - Coupon</li>
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
                  <div className="row ml-0 mr-0  mb-10">
                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_length"></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="dropdown d-block">
                        <a href="/coupon/add">
                          <button
                            type="button"
                            className="btn btn-primary add-btn waves-effect waves-light float-right">
                            <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                            Add Coupon
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-shoot">
                    <table className="table table-centered table-nowrap mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Code</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        {coupon?.map((cp, index) => {
                          return (
                            <tr key={index}>
                              <td>{cp.name}</td>
                              <td>{cp.couponCode}</td>
                              <td>{convertDate(cp.startDate)}</td>
                              <td>{convertDate(cp.endDate)}</td>
                              <td>{cp.status ? "Active" : "Inactive"}</td>
                              <td>
                                <a href={`/coupon/${cp._id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm  waves-effect waves-light btn-table ml-2"
                                  >
                                    Edit
                                  </button>
                                </a>

                                <button
                                  onClick={() => handleDelete(cp._id)}
                                  type="button"
                                  className="btn btn-danger btn-sm  waves-effect waves-light btn-table ml-2"
                                  id="sa-params">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* <!-- end table-responsive --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/* <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <script>document.write(new Date().getFullYear())</script> © TellyTell.
                </div>

            </div>
        </div>
    </footer> */}

      <Footer />
    </div>
  );
}

export default Coupon;
