// stateful 
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

	checkoutCancelled = () => {
		this.props.history.goBack();

	}

	chceckoutContinued = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		let summary = <Redirect to="/" />
		if(this.props.ings) {
			summary = 	( 
				<div>
					<CheckoutSummary 
						cancelCheckout={this.checkoutCancelled} 
						continueCheckout={this.chceckoutContinued} 
						ingredients={this.props.ings}/>

					<Route 
						path={this.props.match.path + '/contact-data'} 
						component={ContactData} />
				</div>	
			);		
		}
		return (
			<div>
				{summary}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
	}
};

// dont neeed dispatch bc there is nothing being dispatached

export default connect(mapStateToProps)(Checkout);

