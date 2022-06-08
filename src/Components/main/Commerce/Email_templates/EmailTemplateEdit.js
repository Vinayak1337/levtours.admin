import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import swal from "sweetalert";
const EmailTemplateEdit = () => {
  const [editEmail, setEditEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);

  const { id } = useParams();
  const { token } = isAutheticated();
  const history = useHistory();

  useEffect(() => {
    async function getEmailTemplate() {
      let template = await axios.get(`${API}/api/email/view_Email/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditEmail(template.data.Email.title);
      setSubject(template.data.Email.subject);
      setContent(template.data.Email.content);
      setStatus(template.data.Email.status);
      template.data.Email.status ? setStatus("Active") : setStatus("Inactive");
      console.log(template);
    }
    getEmailTemplate();
  }, []);

  // For save data
  async function handleSave() {
    let update = await axios.patch(
      `${API}/api/email/update_Email/${id}`,
      {
        subject,
        content,
        status: status === "Active" ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (update.data.message === "Success") {
      swal({
        title: "Saved Successsfully!",
        icon: "success",
        button: "Done",
        type: "success",
      }).then(() => {
        history.push("/email_template");
      });
    }
  }

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div clasName="main-content">
        <div clasName="page-content">
          <div clasName="container-fluid">
            {/* <!-- start page title --> */}
            <div clasName="row">
              <div clasName="col-12">
                <div clasName="page-title-box d-flex align-items-center justify-content-between">
                  <h4 clasName="mb-0">{editEmail}</h4>
                  <div clasName="page-title-right">
                    <ol clasName="breadcrumb m-0">
                      <li clasName="breadcrumb-item">
                        <a href="javascript: void(0);">Lev Tours</a>
                      </li>
                      <li clasName="breadcrumb-item active">Email Template</li>
                      <li clasName="breadcrumb-item active">{editEmail} </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end page title -->

	<!-- Save options Begins--> */}
            <div clasName="row">
              <div clasName="col-12">
                <div clasName="form-group text-right">
                  <button
                    type="button"
                    clasName="btn btn-success btn-login waves-effect waves-light mr-3"
                    onClick={handleSave}
                  >
                    Save
                  </button>

                  <a href="/email_template">
                    <button
                      type="button"
                      clasName="btn btn-success btn-cancel waves-effect waves-light mr-3"
                    >
                      Cancel
                    </button>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Save options Ends-->

	<!-- Row 1 Begins -->                */}
            <div clasName="row">
              {/* <!--Left Column Begins--> */}
              <div clasName="col-lg-8">
                <div clasName="card">
                  <div clasName="card-body">
                    <div clasName="row">
                      <div clasName="col-md-12">
                        {/* <!-- Form Begins --> */}
                        <form>
                          <div clasName="row">
                            <div clasName="col-lg-12">
                              <div clasName="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  clasName="label-100"
                                >
                                  Email Subject
                                </label>
                                <input
                                  type="text"
                                  clasName="form-control input-field"
                                  onChange={(e) => setSubject(e.target.value)}
                                  value={subject}
                                />
                              </div>
                            </div>
                          </div>

                          <div clasName="row">
                            <div clasName="col-lg-12">
                              <div clasName="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  clasName="label-100"
                                >
                                  Contents of the Email
                                </label>
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={content || ""}
                                  onChange={(event, editor) => {
                                    let data = editor.getData();
                                    setContent(data);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* <div clasName="row">
														<div clasName="col-lg-12">
															<div clasName="form-group text-left">
																<a href="email-template.html">
											<button type="button" clasName="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
											</a>
											<a href="email-template.html">
											<button type="button" clasName="btn btn-success btn-cancel waves-effect waves-light mr-3">Cancel</button>
											</a>
															</div>
														</div>
													</div> */}
                        </form>
                        {/* <!-- Form Ends --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Left Column Ends -->

		<!--Right Column Begins --> */}
              <div clasName="col-lg-4">
                <div clasName="card">
                  <div clasName="card-body">
                    {/* <!-- Row Begins --> */}
                    <div clasName="row">
                      <div clasName="col-md-12">
                        <form>
                          <div clasName="row">
                            <div clasName="col-lg-12">
                              <div clasName="form-group">
                                <label
                                  for="basicpill-phoneno-input"
                                  clasName="label-100"
                                >
                                  Change Status
                                </label>
                                <select
                                  name="currency"
                                  value={status}
                                  clasName="form-control  input-field"
                                  onChange={(e) => handleStatus(e)}
                                >
                                  <option value="">--select--</option>
                                  <option>Active</option>
                                  <option>Inactive</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* <!-- Row Ends --> */}
                  </div>
                </div>

                <div clasName="card">
                  <div clasName="card-body">
                    {/* <!-- Row Begins --> */}
                    <div clasName="row">
                      <div clasName="col-md-12">
                        <label
                          for="basicpill-phoneno-input"
                          clasName="label-100"
                        />
                        {/* add close tag yogita */}
                        Reference
                        <table clasName="table table-centered table-nowrap mb-0">
                          <thead clasName="thead-light">
                            <tr>
                              <th>Field Name</th>
                              <th>Value</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td>#first-name</td>
                              <td>First Name</td>
                            </tr>
                            <tr>
                              <td>#last-name</td>
                              <td>Last Name</td>
                            </tr>
                            <tr>
                              <td>#application-name</td>
                              <td>Name of the Channel</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <!-- Row Ends --> */}
                  </div>
                </div>
              </div>
              {/* <!--Right Column Ends --> */}
            </div>
            {/* <!-- Row 1 Ends -->           */}
          </div>
          {/* <!-- container-fluid --> */}
        </div>
        {/* <!-- End Page-content --> */}
      </div>
    </>
  );
};

export default EmailTemplateEdit;
