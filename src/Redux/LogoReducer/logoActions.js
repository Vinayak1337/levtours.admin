import {
	SET_ADMIN_LOGO,
	SET_FOOTER_LOGO,
	SET_HEADER_LOGO,
	SET_LOGOS
} from './logoContants.js';

/**
 *
 * @param {{
 * headerLogo: string,
 * footerLogo: string,
 * adminLogo: string,
 * }} logos
 */
export const setLogos = (logos) => ({
	type: SET_LOGOS,
	payload: logos
});

/**
 *
 * @param {string} headerLogo
 */
export const setHeaderLogo = (headerLogo) => ({
	type: SET_HEADER_LOGO,
	payload: headerLogo
});

/**
 *
 * @param {string} footerLogo
 */
export const setFooterLogo = (footerLogo) => ({
	type: SET_FOOTER_LOGO,
	payload: footerLogo
});

/**
 *
 * @param {string} adminLogo
 */
export const setAdminLogo = (adminLogo) => ({
	type: SET_ADMIN_LOGO,
	payload: adminLogo
});
