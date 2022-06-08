import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "../../Footer";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";

function Addfeatured() {
  const { token } = isAutheticated();
  let productListArr = [];
  const [loading, setLoading] = useState(false);
  const [productList, setProductlist] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      let res = await axios.get(`${API}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res.data.product);
    }
    async function getProductList() {
      let res = await axios.get(`${API}/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.data.data.map((product) => {
        productListArr.push(product.title);
      });

      setProductlist(productListArr);
    }
    getProduct();
    getProductList();
  }, []);

  console.log(productList, "rproductlist");

  function handelTitle(e) {
    const Title = e.target.value;
    let suggestions = [];
    if (Title.length > 0) {
      const regex = new RegExp(`^${Title}`, "i");
      suggestions = productList.sort().filter((prod) => regex.test(prod));
    }

    console.log(suggestions);
    setSuggestion(suggestions);
    setTitle(Title);
  }
  function renderSuggestions() {
    if (suggestion.length === 0) {
      return null;
    }

    function clickedProduct(product) {
      setTitle(product);
      setSuggestion([]);
    }

    return (
      <ul style={{ marginTop: "2rem" }}>
        {suggestion?.map((product, index) => {
          return (
            <li
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => clickedProduct(product)}
            >
              {product}
            </li>
          );
        })}
      </ul>
    );
  }
  function handelChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("name", title);
      formdata.append("image", image);
      formdata.append("status", active);
      formdata.append("productId", id);
      let res = await axios.post(`${API}/api/product/addFeature`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        console.log(res);
        setLoading(false);
        swal("Success!", res.data.message, res.data.status);
      }
    } catch (error) {
      setLoading(false);
      swal("Failed!", error.response.data.message, "error");
    }
  }

  function getSelected(e) {
    e.target.value === "Active" ? setActive(true) : setActive(false);
  }

  function handelCancel() {
    window.location = "/comproducts";
  }
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Add Featured Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Lev Tours</Link>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">
                      Add Featured Product
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- Save options Begins--> */}
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                >
                  <ClipLoader loading={loading} size={18} />
                  {!loading && "Save"}
                </button>
                <button
                  onClick={handelCancel}
                  type="button"
                  className="btn btn-outline-secondary btn-cancel waves-effect waves-light mr-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Save options Ends-->             */}

          {/* <!-- Row 1 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form autoComplete="off">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Add Feature Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => handelTitle(e)}
                                className="form-control input-field"
                                placeholder="Title"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}

            {/* <!--Right Column Begins --> */}
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
                                Status*
                              </label>
                              <select
                                name="status"
                                className="form-control  input-field"
                                onChange={(e) => getSelected(e)}
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
                  </div>
                </div>
              </div>
            </div>
            {/* <!--Right Column Ends --> */}
          </div>
          {/* <!-- Row 1 Ends -->           */}

          {/* <!-- Row 2 Begins -->                */}
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
                                Upload Image*
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload
                                <br />
                                <span className="size">(1920 x 600 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  onChange={(e) => handelChange(e)}
                                  type="file"
                                  className="form-control input-field"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row bg-light border p-2">
                <h6>Product Details</h6>
                <p>
                  <span className="h6">Title:</span> {product.title}
                </p>
                <img src={product.image} className="w-25" alt="product" />
                <p>
                  <span className="h6">Price: </span>
                     {product.sale_price}
                </p>
                <p>
                  <span className="h6">Status:</span>{" "}
                  {product.status ? "ACTIVE" : "INACTIVE"}
                </p>
              </div>
            </div>
            {/* <!-- Left Column Ends --> */}
          </div>
          {/* <!-- Row 2 Ends -->  */}

          {/* <!-- Row 3 Begins -->                */}

          {/* <!-- Row 3 Ends -->  */}

          {/* <!-- Row 4 Begins -->                */}

          {/* <!-- Row 4 Ends -->  */}
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

export default Addfeatured;
