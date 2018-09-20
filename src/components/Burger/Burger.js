import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	// ingreidents from state is not an array
	// need to transform it to an array
	let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey}/>
		});
	})
	//flattend the array so its just one array instead of four arrays
	.reduce((arr, el) => {
		//take given element and add it to array 
		return arr.concat(el)
	}, [])
	if(transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>
	}

	console.log(transformedIngredients);
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);	
};

export default burger;