import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Sam Mintz',
				address: {
					street: 'Teststreet 1',
					zipcode: '60610',
					country: 'USA'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}	
		axios.post('/orders.json', order) // for firebase to work correctly need .json 
			.then(response => {
				this.setState({loading: false, purchasing: false});
			})
			.catch(error => {
				this.setState({loading: false, purchasing: false});
			});
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