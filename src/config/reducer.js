import { combineReducers } from 'redux';
import rdToaster from '../reducers/toaster';
import rdVehicles from '../reducers/vehicles';

export default combineReducers({
	rdToaster,
	rdVehicles
});
