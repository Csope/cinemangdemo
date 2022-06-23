import axios from 'axios';

// axios.defaults.timeout = 1000;

/**
 * Set global Authorization header
 *
 * @param token Auth token
 */
const setAuthToken = (token: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Remove global Authorization header
 */
const removeAuthToken = () => {
	axios.defaults.headers.common['Authorization'] = '';
};

export { setAuthToken, removeAuthToken };
