import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	componentWillUpdate(){
		console.log('[OrderSummary] Will Update')
	}

	render(){
		const ingredientsSummary = Object.keys(this.props.ingredients).map((igkey)=>{
			return (
				<li key={igkey}>
					<span style={{textTransform: 'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
				</li> );
		})
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A great burger with the following ingredients:</p>
				<ul>
					{ingredientsSummary}
				</ul>
				<p><strong>Total Price</strong>{this.props.price.toFixed(2)}</p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.closePurchase}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
			</Aux>
		)
	}
};


	
	

export default OrderSummary;