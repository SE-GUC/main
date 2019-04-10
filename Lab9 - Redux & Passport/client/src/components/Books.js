import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../globalState/actions/bookActions';
import { login, logout } from '../globalState/actions/authActions';
import PropTypes from 'prop-types';

class Books extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// if(this.props.isLoggedIn)
		this.props.getBooks();
	}

	// componentWillUpdate(){
	// 	// if(this.props.isLoggedIn)
	// 	this.props.getBooks();
	// }
	login = () => {
		this.props.login();
	};

	logout = () => {
		this.props.logout();
	};

	render() {
		if (this.props.isLoggedIn) {
			const bookItems = this.props.books.map((book, index) => {
				return (
					<div key={index}>
						<h3>{book.title}</h3>
						<p>{book.author}</p>
					</div>
				);
			});
			return (
				<div>
					<h1> Posts </h1>
					<button onClick={this.logout}>Logout</button>
					{bookItems}
				</div>
			);
		}

		return (
				<div>
					<h1> Please login to view books </h1>
					<button onClick={this.login}>Login</button>
				</div>
		)
	}

	// render() {
	// 		const bookItems = this.props.books.map((book, index) => {
	// 			return (
	// 				<div key={index}>
	// 					<h3>{book.title}</h3>
	// 					<p>{book.author}</p>
	// 				</div>
	// 			);
	// 		});
	// 		return (
	// 			<div>
	// 				<h1> Posts </h1>
	// 				{/* <button onClick={this.logout}>Logout</button> */}
	// 				{bookItems}
	// 			</div>
	// 		);
		
	// }
}

Books.propTypes = {
	getBooks: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired,
	login: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	books: state.books.books,
	isLoggedIn: state.auth.isLoggedIn,
	loggedUser: state.auth.loggedUser,
});

export default connect(mapStateToProps,{ getBooks, login, logout })(Books);
