import { GET_BOOKS, CREATE_BOOK } from './actionTypes';
import axios from 'axios';

export const getBooks = () => dispatch => {
	axios.get('http://localhost:5000/api/books/')
		.then(res =>
			dispatch({
				type: GET_BOOKS,
				payload: res.data.books,
			})
		);
};
