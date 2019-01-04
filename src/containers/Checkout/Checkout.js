// stateful 
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class Checkout extends Component {

	componentWillMount () {
		this.props.onInitPurchase()
	}

	checkoutCancelled = () => {
		this.props.history.goBack();

	}

	chceckoutContinued = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render(){
		let summary = <Redirect to="/" />

		if(this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
			summary = 	( 
				<div>
					{purchasedRedirect}
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
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitPurchase: () => dispatch(action.purchaseInit())
	}
}

// dont neeed dispatch bc there is nothing being dispatached

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

