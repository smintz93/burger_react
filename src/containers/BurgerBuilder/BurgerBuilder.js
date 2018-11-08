//stateful 
import React, { Component }from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
		ingredients: null,
		totalPrice: 0,
		purchaseable: false,
		purchasing: false, 
		loading: false
	}

	componentDidMount() {
		axios.get('https://react-my-burger-a9222.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			});
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
		// alert('You continue');
		this.setState({loading: true})
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
				this.setState({loading: false, purchasing: false});
			})
			.catch(error => {
				this.setState({loading: false, purchasing: false});
			});
	}
	render(){
		const disableInfo = {
			//copying state in an immuatable way
			...this.state.ingredients
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}
		// {salad: true, meat: false, ... }
		// console.log(this.state.ingredients, 'this is state in Burger Builder')
		let orderSummary = null


		let burger = <Spinner />

		if(this.state.ingredients) {
			burger =  (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
						ingredientAdded={this.addIngredient} 
						ingredientRemoved={this.removeIngredient}
						disabled={disableInfo}
						price={this.state.totalPrice}
						purchaseable={this.state.purchaseable}
						ordered={this.purchaseHandler}/>
				</Aux>
			);	

				 orderSummary = 	( 
				 	<OrderSummary 
						ingredients={this.state.ingredients} 
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


export default withErrorHandler(BurgerBuilder, axios);