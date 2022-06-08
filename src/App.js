import React, { useCallback, useEffect } from 'react';
import Routes from './Routes/Routes';
import 'video-react/dist/video-react.css';
import { connect } from 'react-redux';
import { setLogos } from './Redux/LogoReducer/logoActions';
import { API } from './API';

function App({ setLogos }) {
	const fetchAdminLogo = useCallback(
		async () => {
			const res = await fetch(`${API}/api/config/logo`);
			if (!(res.status === 200)) return;
			const json = await res.json();
			setLogos({
				headerLogo: json.Headerlogo,
				footerLogo: json.Footerlogo,
				adminLogo: json.Adminlogo
			});
		},
		[setLogos]
	);

	useEffect(
		() => {
			fetchAdminLogo();
		},
		[fetchAdminLogo]
	);
	return <Routes />;
}

const mapDispatchToProps = dispatch => ({
	setLogos: adminLogo => dispatch(setLogos(adminLogo))
});

export default connect(null, mapDispatchToProps)(App);
