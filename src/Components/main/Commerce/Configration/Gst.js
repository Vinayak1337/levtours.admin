import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import swal from "sweetalert";
import Footer from "../../Footer";


function Gst() {
  const [gst, setGst] = useState("");
  const { token } = isAutheticated();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getConfiguration() {
      const configDetails = await axios.get(`${API}/api/config`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      configDetails.data.result.map((item) => {
        setGst(item.gst);
      });
    }
    getConfiguration();
  }, []);

  async function handelChange(e) {
    setGst(e.target.value);
  }
  async function handelSubmit() {
    setLoading(true);
    let data = {
      gst,
    };
    let res = await axios.post(`${API}/api/config/gst`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res) {
      setLoading(false);
      console.log(res);
      swal("Success!", res.data.message, res.data.status);
    }
  }
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* <!-- start page title --> */}

            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">GST</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Lev Tours</Link>
                      </li>
                      <li className="breadcrumb-item">GST</li>
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
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <h1 className="text-left head-small">GST</h1>

                        <form>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <>
                                  <label
                                    for="basicpill-phoneno-input"
                                    className="label-100 mt-3"
                                  >
                                    GST in %
                                  </label>
                                  <input
                                    value={gst}
                                    type="text"
                                    name="Gst"
                                    onChange={(e) => handelChange(e)}
                                    className="form-control input-field "
                                    id="basicpill-phoneno-input"
                                  />
                                </>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group text-left">
                                <button
                                  type="button"
                                  onClick={handelSubmit}
                                  className="btn btn-success btn-login waves-effect waves-light mr-3 pt-2 pb-2 pr-4 pl-4"
                                >
                                  <ClipLoader loading={loading} size={18} />
                                  {!loading && "Save"}
                                </button>
                                <button
                                  onClick={() => setLoading(false)}
                                  type="button"
                                  className="btn btn-outline-secondary waves-effect waves-light mr-3 pt-2 pb-2 pr-4 pl-4"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
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

        <Footer />
      </div>
    </div>
  );
}

export default Gst;
