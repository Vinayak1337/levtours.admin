import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Sidebar({ adminLogo }) {
	return (
		<div className='vertical-menu'>
			<div className='navbar-brand-box'>
				<Link to='/dashboard/' className='logo logo-dark'>
					<span className='logo-sm'>
						{adminLogo ? (
							<img src={adminLogo} alt='LT' height='25' />
						) : (
							<b style={{ color: 'white' }}>LT</b>
						)}
					</span>
					<span className='logo-lg'>
						{adminLogo ? (
							<img src={adminLogo} alt='Lev Tours' height='50' />
						) : (
							<b style={{ color: 'white' }}>Lev Tours </b>
						)}
					</span>
				</Link>

				<Link to='index.html' className='logo logo-light'>
					<span className='logo-sm'>
						{adminLogo ? (
							<img src={adminLogo} alt='Lev Tours' height='25' />
						) : (
							<b style={{ color: 'white' }}>Lev Tours </b>
						)}
					</span>
					<span className='logo-lg'>
						{adminLogo ? (
							<img src={adminLogo} alt='Lev Tours' height='50' />
						) : (
							<b style={{ color: 'white' }}>Lev Tours </b>
						)}
					</span>
				</Link>
			</div>

			<button
				type='button'
				className='
            btn btn-sm
            px-3
            font-size-16
            header-item
            waves-effect
            vertical-menu-btn
          '
			>
				<i className='fa fa-fw fa-bars' />
			</button>

			<div data-simplebar className='sidebar-menu-scroll'>
				<div id='sidebar-menu'>
					<ul className='metismenu list-unstyled' id='side-menu'>
						<li>
							<Link to='/dashboard'>
								<img src='/assets/images/icons/dashboard-icon.png' alt='' />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/cms-icon.png' alt='' />
								<span>Commerce</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/comproducts'>Products</a>
								</li>
								{/* <li>
                  <a href="/featuredProducts">Featured Products</a>
                </li> */}
								<li>
									<a href='/comcategory'>Category</a>
								</li>
								<li>
									<a href='/comcoupon'>Coupons</a>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/cms-icon.png' alt='' />
								<span>Orders Management</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/new-orders'>New</a>
								</li>
								<li>
									<a href='/process-orders'>Processing</a>
								</li>

								<li>
									<a href='/deliver-orders'>Delivered</a>
								</li>
								<li>
									<a href='/cancel-orders'>Cancelled</a>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/viewer-icon.png' alt='' />
								<span>Customers</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/client/passengers'>Passengers</a>
								</li>
								<li>
									<a href='/client/customers'>Customers</a>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/email_template'>
								<img
									src='/assets/images/icons/email-template-icon.png'
									alt=''
								/>
								<span>Email templates</span>
							</Link>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/cms-icon.png' alt='' />
								<span>Data Collection</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/email-signup'>Email Signups</a>
								</li>
								<li>
									<a href='/contact-request'>Contact Requests</a>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/cms-icon.png' alt='' />
								<span>Configuration</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/tax'>Tax Rates</a>
								</li>
								<li>
									<a href='/socialmedia'>Social Media</a>
								</li>
								<li>
									<a href='/address'>Address</a>
								</li>

								<li>
									<a href='/logo'>Logo</a>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/page'>
								<img src='/assets/images/icons/viewer-icon.png' alt='' />
								<span>Pages</span>
							</Link>
						</li>
						<li>
							<Link to='/dashboard/' className='has-arrow'>
								<img src='/assets/images/icons/content-icon.png' alt='' />
								<span>Blogs</span>
							</Link>
							<ul className='sub-menu' aria-expanded={false}>
								<li>
									<a href='/blogs'>Blog Posts</a>
								</li>
								{/* <li>
									<a href='/blogs-categories'>Categories</a>
								</li> */}
							</ul>
						</li>

						{/* <li>
              <Link to="/earning">
                <img src="/assets/images/icons/earning-icon.png" />
                <span>Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="/payment">
                <img src="/assets/images/icons/payment-settings-icon.png" />
                <span>Payment Settings</span>
              </Link>
            </li> */}
						{/* <li>
              <Link to="/notification">
                <img src="/assets/images/icons/notification-icon.png" />
                <span>Notification Settings</span>
              </Link>
            </li>

            <li>
              <Link to="/subscription/settings">
                <img src="/assets/images/icons/subscrption-plans-icon.png" />
                <span>Subscription Settings</span>
              </Link>
            </li> */}

						{/* <li>
              <Link to="/profile">
                <img src="/assets/images/icons/site-preference.png" />
                <span>Profile</span>
              </Link>
            </li> */}
					</ul>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	adminLogo: state.logoReducer.logos.adminLogo,
});

export default connect(mapStateToProps)(Sidebar);
