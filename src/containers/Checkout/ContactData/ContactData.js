import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	 state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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