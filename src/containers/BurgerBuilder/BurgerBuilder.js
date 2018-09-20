//stateful 
import React, { Component }from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component  {
	// constructor(){
	// 	super(props)
	// 	this.state ={...}
	// }
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		}
	}
	render(){
		console.log(this.state.ingredients, 'this is state in Burger Builder')
		return(
			<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<div>Build Controls</div>
			</Aux>
		);
	}
}


export default BurgerBuilder;