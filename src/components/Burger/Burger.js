import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	console.log(props, "this is props")
	// ingreidents from state is not an array
	// need to transform it to an array
	console.log(props.ingredients, "this is props.ingreidents")
	const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey}/>
		});
	});
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);	
};

export default burger;