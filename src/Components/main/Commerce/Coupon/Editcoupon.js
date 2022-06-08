import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

function Editcoupon() {
  let [name, setName] = useState("");
  let [couponCode, setcouponCode] = useState("");
  let [offPercent, setoffPercent] = useState("");
  let [amountOff, setAmountoff] = useState("");
  let [shipping, setShipping] = useState(false);
  let [appliesTo, setAppliesto] = useState("");
  let [limitUser, setLimituser] = useState("");
  let [customerLimit, setcustomerLimit] = useState(false);
  let [startDate, setStartdate] = useState("");
  let [endDate, setEnddate] = useState("");
  let [expire, setExpire] = useState(false);
  let [status, setStatus] = useState(false);
  let { id } = useParams();
  let { token } = isAutheticated();

  useEffect(() => {
    async function getCoupon() {
      let coupon = await axios.get(`${API}/api/coupon/${id}`);
      console.log(coupon);
      setName(coupon.data.data.name);
      setcouponCode(coupon.data.data.couponCode);
      coupon.data.data.status ? setStatus("Active") : setStatus("Inactive");
      setAmountoff(coupon.data.data.amountOff);
      setoffPercent(coupon.data.data.offPercent);
      setAppliesto(coupon.data.data.appliesTo);
      setExpire(coupon.data.data.expire);
      setShipping(coupon.data.data.shipping);
    }
    getCoupon();
  }, []);

  function handleShipping(e) {
    setShipping(e.target.checked);
  }
  function handleLimit(e) {
    setcustomerLimit(e.target.checked);
  }
  function handleExpire(e) {
    setExpire(e.target.checked);
  }
  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleAppliesTo(e) {
    setAppliesto(e.target.value.toLowerCase());
  }
  function handleuserLimit(e) {
    setLimituser(e.target.value);
  }

  async function handleSubmit() {
    let update = await axios.patch(
      `${API}/api/coupon/${id}`,
      {
        name,
        couponCode,
        offPercent,
        amountOff,
        status: status === "Active" ? true : false,
        shipping,
        appliesTo,
        limitUser,
        customerLimit,
        startDate,
        endDate,
        expire,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(update);

    if (update.data) {
      window.location.href = "/comcoupon";
    }
  }
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div
                className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
              >
                <h4 className="mb-0">Edit Coupon</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">TellyTell</a>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Edit Coupon</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title -->

            <!-- Save options Begins--> */}
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="
                        btn btn-success btn-login
                        waves-effect waves-light
                        mr-3
                      "
                >
                  Save
                </button>

                <a href="#">
                  <button
                    type="button"
                    className="
                        btn btn-success btn-cancel
                        waves-effect waves-light
                        mr-3
                      "
                  >
                    Cancel
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Save options Ends-->

            <!-- Row 1 Begins --> */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Name
                              </label>
                              <input
                                value={name}
                                type="text"
                                className="form-control input-field"
                                onChange={(e) => setName(e.target.value)}
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                This name is shown to customers at checkout.
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Coupon Code
                              </label>
                              <input
                                value={couponCode}
                                type="text"
                                className="form-control input-field"
                                onChange={(e) => setcouponCode(e.target.value)}
                              />
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Customers enter this code at checkout.
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends -->

              <!--Right Column Begins --> */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Status
                              </label>
                              <select
                                name="currency"
                                value={status}
                                className="form-control input-field"
                                onChange={(e) => handleStatus(e)}
                              >
                                <option value="">--select--</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <label className="col-md-12 ">
                          This coupon never expires
                        </label>
                        <div className="col-md-8">
                          <div className=" mb-2">
                            {expire ? (
                              <input
                                type="checkbox"
                                checked
                                className="mr-3"
                                onClick={(e) => handleExpire(e)}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                className="mr-3"
                                onClick={(e) => handleExpire(e)}
                              />
                            )}

                            <label>Yes</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Right Column Ends --> */}
          </div>
          {/* <!-- Row 1 Ends -->

            <!-- Row 2 Begins --> */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <label className="col-md-4 control-label">
                        Promotion
                      </label>
                      <div className="col-md-8">
                        <label>Percentage Off</label>
                        <input
                          value={offPercent}
                          type="text"
                          className="w-100"
                          onChange={(e) => setoffPercent(e.target.value)}
                        />
                        <label>Amount Off</label>
                        <input
                          value={amountOff}
                          type="text"
                          className="w-100"
                          onChange={(e) => setAmountoff(e.target.value * 1)}
                        />
                        <label>Free Shipping</label>
                        <br />
                        {shipping ? (
                          <input
                            type="checkbox"
                            checked
                            onClick={(e) => handleShipping(e)}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={(e) => handleShipping(e)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}
          </div>
          {/* <!-- Row 2 Ends -->
            <!-- Row 2 Begins --> */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Applies to
                              </label>
                              <select
                                value={appliesTo}
                                className="form-control input-field"
                                onChange={(e) => handleAppliesTo(e)}
                              >
                                <option value="">--select--</option>
                                <option value="Any Order">Any Order</option>
                                <option value="Orders Over">Orders Over</option>
                                <option value="Single Product">
                                  Single Product
                                </option>
                                <option value="Products by Category">
                                  Products by Category
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Limit Total User
                              </label>
                              <select
                                name="currency"
                                value=""
                                className="form-control input-field"
                                onChange={(e) => handleuserLimit(e)}
                              >
                                <option value="">--select--</option>
                                <option value="unlimited">Unlimited</option>
                                <option value="limited">Limited Users</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <label className="col-md-4">Customer limit</label>
                      <div className="col-md-8">
                        <div className=" mb-2">
                          {customerLimit ? (
                            <input
                              checked
                              type="checkbox"
                              className="mr-2"
                              onClick={(e) => handleLimit(e)}
                            />
                          ) : (
                            <input
                              checked
                              type="checkbox"
                              className="mr-2"
                              onClick={(e) => handleLimit(e)}
                            />
                          )}

                          <label>Limit one per customer</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          for="basicpill-phoneno-input"
                          className="label-100"
                        >
                          Start Date
                        </label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control input-field"
                            data-provide="datepicker"
                            data-date-format="dd M, yyyy"
                            data-date-autoclose="true"
                            onChange={(e) => setStartdate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          for="basicpill-phoneno-input"
                          className="label-100"
                        >
                          End Date
                        </label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control input-field"
                            data-provide="datepicker"
                            data-date-format="dd M, yyyy"
                            data-date-autoclose="true"
                            onChange={(e) => setEnddate(e.target.value)}
                          />
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
    </div>
  );
}

export default Editcoupon;
