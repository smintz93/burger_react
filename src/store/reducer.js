import * as actionTypes from './actions';

const initialState = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.ADD_INGREDIENT:
			return {
				// don't resuse old state...create new one
				...state,
				ingredients: {
					...state.ingredients,
					// need to override ingreds (es 6 syntax)
					[action.ingedientName]: state.ingredients[action.ingedientName] + 1
				}
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state, 
				ingredients: {
					...state.ingredients,
					[action.ingedientName]: state.ingredients[action.ingedientName] - 1
				}

			};
		default:
			return state;
	}

	// return state;


};

export default reducer;