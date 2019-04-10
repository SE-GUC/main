import { LOGIN, LOGOUT } from './actionTypes';
import axios from 'axios';

import setAuthToken  from '../../helpers/setAuthToken'

export const login = () => dispatch => {
	dispatch({
		type: LOGIN,
		payload: {
			username: 'Ammar',
			email: 'email',
		},
	});
};

export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};


// export const login = (userData) => dispatch => {
// 	axios.post('http://localhost:5000/api/users/login', userData)
// 	.then( res => {
	// 	const { token } = res.data
	// 	localStorage.setItem('jwtToken', token)
	// 	setAuthToken(token)

	// })
	// .catch(err => console.log('error'))
		
	// };
