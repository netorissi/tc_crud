import * as actionType from './actionTypes';

export const SET_TOASTER = (variant, message) => ({ 
	type: actionType.SET_TOASTER, 
	payload: { variant, message } 
});

export const RESET_TOASTER = () => ({ 
	type: actionType.RESET_TOASTER 
});

export const ACTIVE_TOASTER = (variant, message) => async dispatch => {

	if (variant && message) {
		await dispatch(SET_TOASTER(variant, message));
		setTimeout(() => {
			dispatch(RESET_TOASTER());
		}, 5000);
	}
}