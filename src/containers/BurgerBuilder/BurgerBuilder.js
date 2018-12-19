//stateful 
import React, { Component }from 'react';
import { connect } from 'react-redux';
//
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component  {
	// constructor(){
	// 	super(props)
	// 	this.state ={...}
	// }
	state = {
		purchasing: false, 
		loading: false,
		error: false
	}

	componentDidMount() {
		// axios.get('https://react-my-burger-a9222.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data})
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true})
		// 	});
	}
	updatePurchaseState = (ingredients) => {
		// creating an array to sum ingredient totals to check if they have been added to order
		const sum = Object.keys(ingredients).map(igKey => {
			// getting the key values
			return ingredients[igKey]
		})
		.reduce((sum, el) => {
			return sum + el
		}, 0)
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	closeModal = () => {
		this.setState({purchasing: false})
	}
	purchaseContinue = () => {
		this.props.history.push('/checkout');

	}	
	render(){
		const disableInfo = {
			//copying state in an immuatable way
			...this.props.ings
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}
		// {salad: true, meat: false, ... }
		// console.log(this.state.ingredients, 'this is state in Burger Builder')
		let orderSummary = null;
		let burger = this.state.error ? <p>ingredients can't be loading</p> :<Spinner />;

		if(this.props.ings) {
			burger =  (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						ingredientAdded={this.props.onIngredientAdded} 
						ingredientRemoved={this.props.onRemovedIngedient}
						disabled={disableInfo}
						price={this.props.price}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}/>
				</Aux>
			);	

				 orderSummary = 	( 
				 	<OrderSummary 
						ingredients={this.props.ings} 
						closePurchase={this.closeModal}
						continuePurchase={this.purchaseContinue}
						price={this.props.price}/>	)
		}

		if(this.state.loading){
			orderSummary = <Spinner />
		}
	
		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.closeModal}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStatToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onRemovedIngedient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
	};
}



export default connect(mapStatToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));