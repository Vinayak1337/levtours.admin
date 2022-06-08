import {
	INITIAL_LOGOS_STATE,
	SET_ADMIN_LOGO,
	SET_FOOTER_LOGO,
	SET_HEADER_LOGO,
	SET_LOGOS
} from './logoContants';

const logoReducer = (state = INITIAL_LOGOS_STATE, action) => {
	switch (action.type) {
		case SET_LOGOS:
			return { ...state, logos: action.payload };

		case SET_HEADER_LOGO:
			return {
				...state,
				logos: { ...state.logos, headerLogo: action.payload }
			};

		case SET_FOOTER_LOGO:
			return {
				...state,
				logos: { ...state.logos, footerLogo: action.payload }
			};

		case SET_ADMIN_LOGO:
			return {
				...state,
				logos: { ...state.logos, adminLogo: action.payload }
			};

		default:
			return state;
	}
};

export default logoReducer;
