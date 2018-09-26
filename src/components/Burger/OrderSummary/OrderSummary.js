import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((igkey)=>{
		return (
			<li>
				<span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
			</li>
		)
	})
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A great burger with the following ingredients:</p>
			<ul>
				{ingredientsSummary}
			</ul>
			<p>Continue to Checkout?</p>
		</Aux>
	)
};
	
	

export default orderSummary;