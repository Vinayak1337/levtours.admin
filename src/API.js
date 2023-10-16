// export const API = "https://mantur-server.herokuapp.com";
// export const API = "https://api.tellytell.com";
//export const API = "http://localhost:5000";
// export const API = "https://popstoreeee.herokuapp.com";
// export const API="https://api.potionsofparadise.com"

import { useEffect } from 'react';

// export const API = 'https://levtours-server.onrender.com';

export const API = 'http://localhost:5000';

export const useLogger = (...args) => {
	useEffect(
		() => {
			console.log(...args);
		},
		[args]
	);
};
