import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";

function EditCategory(props) {
  const { token } = isAutheticated();
  const [inputText, setinputText] = useState("");
  const [fetchedCategory, setfetchedCategory] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [category, setCategory] = useState([]);
  const [catId, setcatId] = useState("");
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    async function subCategory() {
      let subCat = await axios.get(`${API}/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setfetchedCategory(subCat.data.parentId?.category);
      setinputText(subCat.data.category);
      setCategoryImg(subCat.data.image);

      console.log(subCat);
    }
    async function fetchData() {
      let res = await axios.get(`${API}/api/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setCategory(res.data);
    }

    subCategory();
    fetchData();
  }, [categoryId, token]);

  function selectCategory(e) {
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index];
    let optionId = optionElement.getAttribute("id");
    setcatId(optionId);
  }
  const handleSubmit = async () => {
    setLoading(true);
    if (categoryImg !== "") {
      const formdata = new FormData();
      formdata.append("image", categoryImg);
      formdata.append("category", inputText);
      let res = await axios.patch(
        `${API}/api/category/${categoryId}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setLoading(false);
        window.location = "/comcategory";
      }
    } else {
      console.log(categoryId, inputText);
      let res = await axios.patch(
        `${API}/api/category/${categoryId}`,
        {
          category: inputText,
          parentId: catId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setLoading(false);
        window.location = "/comsubcategory";
      }
    }
  };

  const handleInputText = (e) => {
    console.log(e.target.value);
    setinputText(e.target.value);
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">
                  {props.heading ? props.heading : "Commerce - Categories"}
                </h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Lev Tours</Link>
                    </li>
                    <li className="breadcrumb-item">
                      {props.heading ? props.heading : "Commerce - Categories"}
                    </li>
                    <li className="breadcrumb-item">Edit</li>
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
                      <h1 className="text-left head-small">
                        {props.sub_heading
                          ? props.sub_heading
                          : "Edit Category"}
                      </h1>

                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              {props.sub_heading ? (
                                <select
                                  className="form-control input-field"
                                  onChange={(e) => selectCategory(e)}
                                >
                                  <option>{fetchedCategory}</option>
                                  {category.map((cat) => {
                                    return (
                                      <option id={cat._id}>
                                        {cat.category}
                                      </option>
                                    );
                                  })}
                                </select>
                              ) : null}
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              ></label>
                              <input
                                value={inputText}
                                onChange={handleInputText}
                                type="text"
                                className="form-control input-field"
                              />
                            </div>
                          </div>
                        </div>

                        {props.sub_heading ? null : (
                          <div>
                            <label
                              for="basicpill-phoneno-input"
                              className="label-100"
                            >
                              Upload Category Image
                            </label>
                            {categoryImg ? (
                              <img src={categoryImg} className="w-25 mb-2" alt="" />
                            ) : (
                              ""
                            )}
                            <input
                              type="file"
                              onChange={(e) =>
                                setCategoryImg(e.target.files[0])
                              }
                              className="form-control input-field mb-3"
                              id="basicpill-phoneno-input"
                            />
                          </div>
                        )}

                        <div className="row">
                          <div className="col-lg-2">
                            <div className="form-group text-left">
                              <button
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-success btn-login waves-effect waves-light mr-3"
                              >
                                <ClipLoader loading={loading} size={18} />
                                {!loading && "Save"}
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group text-left">
                              {props.sub_heading ? (
                                <a href="/comsubcategory">
                                  <button
                                    type="button"
                                    className="btn btn-success bg-light text-dark waves-effect waves-light mr-3"
                                  >
                                    Cancel
                                  </button>
                                </a>
                              ) : (
                                <a href="/comcategory">
                                  <button
                                    type="button"
                                    className="btn btn-success bg-light text-dark waves-effect waves-light mr-3"
                                  >
                                    Cancel
                                  </button>
                                </a>
                              )}
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

export default EditCategory;
