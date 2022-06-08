import EmailTemplatetabel from "./EmailTemplatetabel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

const EmailTemplate = () => {
  const [email, setEmail] = useState(null);

  const { token } = isAutheticated();

  useEffect(() => {
    async function getServices() {
      let Email = await axios.get(`${API}/api/email/view_Email`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(Email);
      setEmail(Email.data.Email);
    }
    getServices();
  }, []);

  return (
    <>
      <div id="layout-wrapper">
        {/* paste navbar here with image of user */}

        {/*  Left Sidebar dashboard */}

        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0">Email Template</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Lev Tours</a>
                        </li>
                        <li className="breadcrumb-item">Email Template</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row ml-0 mr-0  mb-10">
                        <div className="col-sm-12 col-md-6"></div>
                      </div>
                      <div className="table-responsive table-shoot">
                        <table className="table table-centered table-nowrap mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th>Title</th>
                              <th>Updated On</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {email != null && (
                              <>
                                {email.map((val) => (
                                  <EmailTemplatetabel
                                    title={val.title}
                                    id={val._id}
                                    updatedAt={val.updatedAt}
                                    status={val.status}
                                  />
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {/* <!-- end table-responsive --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* <!-- container-fluid --> */}
          </div>
          {/* end page content */}
        </div>

        {/* End main content */}
      </div>
      {/* end layout wrapper */}
    </>
  );
};

export default EmailTemplate;
