import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import ChangePassword from '../Components/main/ChangePassword';
import EditProfile from '../Components/main/EditProfile';
import Profile from '../Components/main/Profile';
import PrivateRoute from './Privateroute';
import Dashboard from '../Components/main/Dashboard';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { API } from '../API';
import Products from '../Components/main/Commerce/Products/Products';
import AddProducts from '../Components/main/Commerce/Products/AddProducts';
import Editproducts from '../Components/main/Commerce/Products/Editproducts';
import Category from '../Components/main/Commerce/Category/Category';
import AddCategory from '../Components/main/Commerce/Category/AddCategory';
import EditCategory from '../Components/main/Commerce/Category/EditCategory';
import Base from '../Components/Base';

import Client from '../Components/main/Commerce/Clients/Client';
import ViewClient from '../Components/main/Commerce/Clients/ViewClient';
import Customers from '../Components/main/Commerce/Clients/Customers/Customers';
import Addcustomer from '../Components/main/Commerce/Clients/Customers/Addcustomer';
import Editcustomer from '../Components/main/Commerce/Clients/Customers/Editcustomer';

import Passengers from '../Components/main/Commerce/Clients/Passengers/Passengers';
import HandlePassenger from '../Components/main/Commerce/Clients/Passengers/handlePassenger';

import FeaturedProducts from '../Components/main/Commerce/Products/FeaturedProducts';
import Addfeatured from '../Components/main/Commerce/Products/Addfeatured';
import Editfeatured from '../Components/main/Commerce/Products/Editfeatured';
import Coupon from '../Components/main/Commerce/Coupon/Coupon';
import Addcoupon from '../Components/main/Commerce/Coupon/Addcoupon';
import New from '../Components/main/Commerce/Orders/New';
import Vieworder from '../Components/main/Commerce/Orders/Vieworder';
import Processing from '../Components/main/Commerce/Orders/Processing';
import Delivered from '../Components/main/Commerce/Orders/Delivered';
import Cancelled from '../Components/main/Commerce/Orders/Cancelled';
import Tax from '../Components/main/Commerce/Configration/Tax';
import Edittax from '../Components/main/Commerce/Configration/Edittax';
import Addtax from '../Components/main/Commerce/Configration/Addtax';
import Page from '../Components/main/Commerce/Page/Page';
import Pageadd from '../Components/main/Commerce/Page/Pageadd';
import Editpage from '../Components/main/Commerce/Page/Editpage';
import Gst from '../Components/main/Commerce/Configration/Gst';
import Socialmedia from '../Components/main/Commerce/Configration/Socialmedia';
import Address from '../Components/main/Commerce/Configration/Address';
import Logo from '../Components/main/Commerce/Configration/Logo';
import Addshipping from '../Components/main/Commerce/Configration/Addshipping';
import Editshipping from '../Components/main/Commerce/Configration/Editshipping';
import Email from '../Components/main/Commerce/Data/Email';
import Addemail from '../Components/main/Commerce/Data/Addemail';
import Contact from '../Components/main/Commerce/Data/Contact';
import Contactrequest from '../Components/main/Commerce/Data/Contactrequest';
import Viewcontact from '../Components/main/Commerce/Data/Viewcontact';
import Editcoupon from '../Components/main/Commerce/Coupon/Editcoupon';

import EmailTemplate from '../Components/main/Commerce/Email_templates/EmailTemplate';
import EmailTemplateEdit from '../Components/main/Commerce/Email_templates/EmailTemplateEdit';
import Blogs from '../Components/main/Commerce/Blog/BlogPosts/blogs';
import AddBlog from '../Components/main/Commerce/Blog/BlogPosts/AddBlog';
import EditBlog from '../Components/main/Commerce/Blog/BlogPosts/EditBlog';

export default function Routes() {
	setInterval(async () => {
		let idToken = sessionStorage.getItem('id_token');
		let refresh_token = sessionStorage.getItem('refresh_token');
		let params = new URLSearchParams({ refresh_token });
		refresh_token &&
			(await axios
				.post(`${API}/api/client/refreshToken`, params, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: `Bearer ${idToken}`,
					},
				})
				.then((response) => {
					console.log('cognito data', response);
					let data = response.data.data;
					sessionStorage.setItem('access_token', data.AccessToken);
					sessionStorage.setItem('id_token', data.IdToken);
				})
				.catch((err) => {
					console.log(err);
				}));
	}, 3000000);
	return (
		<Router>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/register' exact component={Register} />

				<Base>
					{/* BASE STARTING HERE */}
					<PrivateRoute path='/dashboard' exact component={Dashboard} />
					<PrivateRoute path='/notification' exact component={Notification} />
					<PrivateRoute path='/profile' exact component={Profile} />
					<PrivateRoute path='/edit/profile' exact component={EditProfile} />
					<PrivateRoute
						path='/change/password'
						exact
						component={ChangePassword}
					/>

					<PrivateRoute component={Products} exact path='/comproducts' />
					<PrivateRoute
						component={FeaturedProducts}
						exact
						path='/featuredProducts'
					/>
					<PrivateRoute
						component={Addfeatured}
						exact
						path='/featuredProduct/add/:id'
					/>
					<PrivateRoute
						component={Editfeatured}
						exact
						path='/featuredProduct/edit/:id'
					/>

					<PrivateRoute component={AddProducts} exact path='/comproducts/add' />
					<PrivateRoute
						component={Editproducts}
						exact
						path='/comproducts/edit/:productId'
					/>

					<PrivateRoute component={Category} exact path='/comcategory' />
					<PrivateRoute component={AddCategory} exact path='/comcategory/add' />
					<PrivateRoute
						component={EditCategory}
						exact
						path='/comcategory/edit/:categoryId'
					/>
					<PrivateRoute component={Coupon} exact path='/comcoupon' />
					<PrivateRoute component={Addcoupon} exact path='/coupon/add' />
					<PrivateRoute component={Editcoupon} exact path='/coupon/:id' />

					<PrivateRoute component={Client} exact path='/clients' />

					<PrivateRoute component={ViewClient} exact path='/client-view/:id' />
					<PrivateRoute component={Customers} exact path='/client/customers' />
					<PrivateRoute
						component={Addcustomer}
						exact
						path='/client/customers/add'
					/>
					<PrivateRoute
						component={Editcustomer}
						exact
						path='/client/customers/edit'
					/>
					<PrivateRoute
						component={Passengers}
						exact
						path='/client/passengers'
					/>
					<PrivateRoute
						component={HandlePassenger}
						exact
						path='/client/passengers/add'
					/>
					<PrivateRoute
						component={HandlePassenger}
						exact
						path='/client/passengers/edit:id'
					/>
					<PrivateRoute
						component={EmailTemplate}
						exact
						path='/email_template'
					/>

					<PrivateRoute
						component={EmailTemplateEdit}
						exact
						path='/email_template_edit/:id'
					/>

					<PrivateRoute component={Addshipping} exact path='/addShipping' />
					<PrivateRoute
						component={Editshipping}
						exact
						path='/editShipping/:id'
					/>
					<PrivateRoute component={Tax} exact path='/tax' />
					<PrivateRoute component={Edittax} exact path='/tax/:id' />

					<PrivateRoute component={Addtax} exact path='/addtax' />
					<PrivateRoute component={Page} exact path='/page' />
					<PrivateRoute component={Pageadd} exact path='/page/add' />
					<PrivateRoute component={Editpage} exact path='/page/edit/:id' />
					<PrivateRoute component={Socialmedia} exact path='/socialmedia' />
					<PrivateRoute component={Address} exact path='/address' />
					<PrivateRoute component={Logo} exact path='/logo' />
					<PrivateRoute component={New} exact path='/new-orders' />
					<PrivateRoute component={Vieworder} exact path='/view-orders/:id' />
					<PrivateRoute component={Processing} exact path='/process-orders' />
					<PrivateRoute component={Delivered} exact path='/deliver-orders' />

					<PrivateRoute component={Cancelled} exact path='/cancel-orders' />

					<PrivateRoute component={Gst} exact path='/gst' />

					<PrivateRoute component={Email} exact path='/email-signup' />
					<PrivateRoute component={Addemail} exact path='/add-email' />
					<PrivateRoute component={Contact} exact path='/contact-request' />
					<PrivateRoute component={Contactrequest} exact path='/add-contact' />
					<PrivateRoute
						component={Viewcontact}
						exact
						path='/view-contact/:id'
					/>
					<PrivateRoute path='/blogs' component={Blogs} exact />
					<PrivateRoute path='/blogs/add' component={AddBlog} exact />
					<PrivateRoute path='/blogs/edit/:id' component={EditBlog} exact />
				</Base>
			</Switch>
		</Router>
	);
}
