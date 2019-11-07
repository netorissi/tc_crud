import * as actionType from '../actions/actionTypes';

const initialState = {
	vehicles: [],
};

export default (state = initialState, action) => {

	switch (action.type) {

		case actionType.SET_VEHICLES:
			return { ...state,
				vehicles: action.payload.vehicles
			}

		default:
			return state;
	}
}
