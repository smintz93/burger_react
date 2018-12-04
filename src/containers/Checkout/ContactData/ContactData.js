import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false});
			});
	}

	render() {
		let form = (
			<form>
				<Input inputype="input" name="name" placeholder="Your name" />
				<Input inputype="input" name="email" placeholder="Your email" />
				<Input inputype="input" name="street" placeholder="Your street" />
				<Input inputype="input" name="postal" placeholder="Your postal code" />
				<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
			</form>
		);
		if(this.state.loading){
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Info</h4>
					{form}
			</div>
		);
	}
}


export default ContactData; 