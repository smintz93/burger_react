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
import * as actionTypes from  '../../store/actions';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component  {
	// constructor(){
	// 	super(props)
	// 	this.state ={...}
	// }
	state = {
		totalPrice: 4,
		purchaseable: false,
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
		this.setState({purchaseable: sum > 0});
	}

	addIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) {
			return ;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
		
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	closeModal = () => {
		this.setState({purchasing: false})
	}
	purchaseContinue = () => {

		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		// pushing price
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
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
						price={this.state.totalPrice}
						purchaseable={this.state.purchaseable}
						ordered={this.purchaseHandler}/>
				</Aux>
			);	

				 orderSummary = 	( 
				 	<OrderSummary 
						ingredients={this.props.ings} 
						closePurchase={this.closeModal}
						continuePurchase={this.purchaseContinue}
						price={this.state.totalPrice}/>	)
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
		ings: state.ingredients
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onRemovedIngedient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	};
}



export default connect(mapStatToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));