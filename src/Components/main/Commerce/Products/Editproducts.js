import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { API } from "../../../../API";
import { isAutheticated } from "../../../auth/authhelper";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer";
import swal from "sweetalert";

function Editproducts() {
  const { token } = isAutheticated();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({
   
    title: "",
    description: "",
    category: "",
    tax: "",
    price: "",
    status:"",
    sale_price: "",
    sku: "test2",
    featuredImage: "",
    images: [],
    categories: [],
    Taxes: [],
    loading: false
  });

  const {
    images,
    title,
    description,
    category,
    tax,
    price,
    sale_price,
    sku,
    status,
    featuredImage,
    categories,
    Taxes,
    loading
  } = productDetails;

 

  const changeState = (newState) =>
    setProductDetails((prevSate) => ({ ...prevSate, ...newState }));

  const FetchCategories = useCallback(async () => {
    let res = await axios.get(`${API}/api/category`, {
      header: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.length > 0) {
      changeState({ categories: res.data });
    }
  }, [token]);

  const fetchTaxes = useCallback(async () => {
    let res = await axios.get(`${API}/api/tax/view_tax`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.length > 0) {
      changeState({ Taxes: res.data });
    }
  }, [token]);

  const FetchProductDetails = useCallback(async () => {
    let res = await axios.get(`${API}/api/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    changeState({...res.data})
  }, [productId, token]);
  

  useEffect(() => {
    FetchCategories();
    fetchTaxes();
    FetchProductDetails();
  }, [FetchCategories, fetchTaxes, FetchProductDetails]);
// update code


  const handleChange = (e) =>{
    const {name, value}= e.target
    changeState({[name]: value})
  }
const handleSave = async()=>{
    if(!(
    images.length  ||
    title ||
    description ||
    category ||
    tax ||
    price ||
    sale_price ||
    sku ||
    status === null ||
    featuredImage 
    ))
    {
        alert('Please fill required field ');
        return;
    }
    changeState({ loading: true });

    const formdata= new FormData()


    if (images.length && !(typeof images[0] === 'string')) {
			for (const key of Object.keys(images)) 
				formdata.append('images', images[key]);
			
		} else {
			formdata.append('images', '');
		}

		if (typeof featuredImage === 'object') 
		formdata.append('featuredImage', featuredImage);
		else formdata.append('featuredImage', '');

		formdata.append('title', title);
		formdata.append('description', description);
		formdata.append(
			'category', typeof category === 'string' ?
			categories.find((item) => item.category === category)?._id : category._id
		);
    formdata.append('tax', typeof tax ==='string'?  Taxes.find((item) => item.name === tax)?._id : tax._id);
		formdata.append('price', price);
		formdata.append('sale_price', sale_price);
		formdata.append('sku', sku);
		formdata.append('status', status);


    let res= await axios.patch(`${API}/api/product/${productId}`, formdata,{
      headers: {
				Authorization: `Bearer ${token}`
			}
    })

    if (res.status === 200) window.location = '/comproducts';
		else swal(res.status, res.data);
}

const handleFeaturedImage = (e) => changeState({featuredImage: e.target.files[0]}) ;
  

const handleProductimages = (e)=>changeState({images: e.target.files});


const handleImageDelete = async (url) => {
  let res = await axios.delete(
    `${API}/api/product/deleteImage/${productId}?url=${url}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  FetchProductDetails()

}
const handleFeaturedImageDelete = async () => {
  let res = await axios.delete(
    `${API}/api/product/deleteFeaturedImage/${productId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  FetchProductDetails()


}


  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Edit Product</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Lev Tours</Link>
                    </li>
                    <li className="breadcrumb-item active">Commerce</li>
                    <li className="breadcrumb-item active">Edit Product</li>
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
                onClick={handleSave}
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                >
                  Save
                </button>
                <Link to="/comproducts">
                  <button
                    type="button"
                    className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  >
                    Cancel
                  </button>
                </Link>
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
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Title
                              </label>
                              <input
                                name="title"
                                type="text"
                                value={title}
                                onChange={handleChange}
                                className="form-control input-field"
                                placeholder="Title"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-30 width-100 row">
                            <label className="col-md-4 control-label">
                              Description
                            </label>
                            <div className="col-md-13">
                              <textarea
                                name="description"
                                className="form-control input-field"
                                rows="5"
                                onChange={handleChange}
                                value={description}
                                placeholder="Add description"
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
                                Select Tax*
                              </label>
                              <select
                                name="tax"
                                className="form-control  input-field"
                                value={tax.name}
                                onChange={handleChange}
                              >
                                <option value="">--select--</option>
                                {Taxes?.map((item) => (
                                  <option value={item.name}>{item.name} &nbsp; {item.tax}%</option>
                                ))}
                              </select>
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
                                Select Category
                              </label>
                              <select
                                name="category"
                                className="form-control  input-field"
                                value={category.category}
                                onChange={handleChange}
                              >
                                <option value="">--select--</option>
                                {categories.length > 0 &&
                                  categories.map((item) => (
                                    <option value={item.category}>
                                      {item.category}
                                    </option>
                                  ))}
                              </select>
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
                                Status
                              </label>
                              <select
                                name="status"
                                className="form-control  input-field"
                                value={status? "Display on Website" : "Do Not Display on Website"}
                                onChange={e => changeState({status: e.target.value.startsWith('Display')})}
                              >
                                <option value="">--select--</option>
                                <option value="Display on Website">
                                  Display on Website
                                </option>
                                <option value="Do Not Display on Website">
                                  Do Not Display on Website
                                </option>
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
                                Upload Featured Product Image*
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload One Image Only
                                <br />
                                <span className="size">(320 x 180 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  accept="image/*"
                                  type="file"
                                  className="form-control input-field"
                                  onChange={(e)=>handleFeaturedImage(e)}
                                />
                                <div>
                                  <div>
{featuredImage != null && <>
<img src={featuredImage}
 alt="featured" 
 className="w-50 mt-3" 
/>
<div className="btn btn-danger ml-5"  onClick={()=> handleFeaturedImageDelete(featuredImage)} >Delete</div>
</>}
                                  </div>
                                </div>
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
                                Upload Product Images*
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30 width-100 row">
                              <label className="col-md-4 control-label">
                                Upload Upto 9 Images
                                <br />
                                <span className="size">(320 x 180 px)</span>
                              </label>
                              <div className="col-md-8">
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="form-control input-field"
                                  onChange={(e)=>handleProductimages(e)}
                                />
                              </div>
                              
                                 {images.length > 0 ? images.map((item,index) => {
                                   return(
                                    <>
                                    <div> 
                                     <img 
                                     key={index}
                                     src={item} alt="product"
                                     className="w-25 m-3" />
                                     <div className="btn btn-danger"  onClick={() => handleImageDelete(item)}>Delete</div> 
                                     </div>
                                     </>  
                                   )
                                 }
                                        
                                ): null} 
                              
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
          </div>
          {/* <!-- Row 2 Ends -->  */}

          {/* <!-- Row 3 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Price
                              </label>
                              <input
                                type="text"
                                name="price"
                                value={price}
                                className="form-control input-field"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Sale Price
                              </label>
                              <input
                                name="sale_price"
                                onChange={handleChange}
                                value={sale_price}
                                type="text"
                                className="form-control input-field"
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
          </div>
          {/* <!-- Row 3 Ends -->  */}

          {/* <!-- Row 4 Begins -->                */}
          <div className="row">
            {/* <!--Left Column Begins--> */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                SKU
                              </label>
                              <input
                                name="sku"
                                type="text"
                                onChange={handleChange}
                                className="form-control input-field"
                                value={sku}
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
          </div>
          {/* <!-- Row 4 Ends -->  */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      <Footer />
    </div>
  );
}

export default Editproducts;
