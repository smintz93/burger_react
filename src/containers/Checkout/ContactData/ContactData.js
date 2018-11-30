import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	}

	orderHandler = (e) => {
		e.preventDefault();
		console.log(this.props.ingredients, "props in orderHandler")
	}

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Info</h4>
				<form>
					<input className={classes.Input }type="text" name="name" placeholder="Your name" />
					<input className={classes.Input }type="email" name="email" placeholder="Your email" />
					<input className={classes.Input }type="text" name="street" placeholder="Your street" />
					<input className={classes.Input }type="text" name="postal" placeholder="Your postal code" />
					<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
				</form>
			</div>
		);
	}
}


export default ContactData; 