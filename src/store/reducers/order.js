import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS:
		// this is coming from action creator 
		const newOrder = {
			...action.orderData,
			id: action.orderId

		};
			return {
				...state,
				loading: false,
				// need to use concat bc it returns new array
				orders: state.orders.concat(newOrder)

			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;	

	}
};


export default reducer;