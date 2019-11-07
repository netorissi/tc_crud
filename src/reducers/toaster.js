import * as actionType from '../actions/actionTypes';

const initialState = {
	open: false,
	variant: '',
	message: '',
};

export default (state = initialState, action) => {

	switch (action.type) {

		case actionType.SET_TOASTER:
			return { 
				...state,
				open: true,
				variant: action.payload.variant,
				message: action.payload.message
			};

		case actionType.RESET_TOASTER:
			return { 
				...state,
				open: false,
				variant: '',
				message: ''
			}

		default:
			return state;
	}
}
