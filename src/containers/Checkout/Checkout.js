// stateful 
import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 1,
			bacon: 1
		}
	}

	checkoutCancelled = () => {
		this.props.history.goBack();
	}

	chceckoutContinued = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render(){

		return (
			<div>
				<CheckoutSummary 
					cancelCheckout={this.checkoutCancelled} 
					continueCheckout={this.chceckoutContinued} 
					ingredients={this.state.ingredients}/>
			</div>
		);
	}
}

export default Checkout;

