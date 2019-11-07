import axios from 'axios';
import * as actionType from './actionTypes';
import * as acToaster from './toaster';
import { BASE_ENDPOINT } from '../routes/names';

const setVehicles = vehicles => ({
    type: actionType.SET_VEHICLES,
	payload: { vehicles }
});

export const getVehicles = textFilter => async dispatch => {

    if (textFilter) {
        await axios.get(`${BASE_ENDPOINT}/cars?search=${textFilter}`)
        .then(async resp => {
            const vehicles = resp.data || [];
            await dispatch(setVehicles(vehicles));
        })
        .catch(async error => {
            console.log("DEU RUIM", error)
            await dispatch(acToaster.ACTIVE_TOASTER(
                'error',
                'Ocorreu um erro inesperado!'
            ))
            
        })
    }
}

export const postVehicles = vehicle => async dispatch => {

	await axios.post(`${BASE_ENDPOINT}/cars`, vehicle)
    .then(async () => {
        await  dispatch(getVehicles());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            'Novo cadastro realizado com sucesso!'
        ))
    })
    .catch(async error => {
        console.log("DEU RUIM", error)
        await dispatch(acToaster.ACTIVE_TOASTER(
            'error',
            'Ocorreu um erro inesperado!'
        ))
        
    })
}

export const putVehicles = vehicle => async dispatch => {

	await axios.put(`${BASE_ENDPOINT}/cars/${vehicle.id}`, vehicle)
    .then(async () => {
        await  dispatch(getVehicles());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            'Cadastro atualizado com sucesso!'
        ))
    })
    .catch(async error => {
        console.log("DEU RUIM", error)
        await dispatch(acToaster.ACTIVE_TOASTER(
            'error',
            'Ocorreu um erro inesperado!'
        ))
        
    })
}

export const deleteVehicles = vehicleId => async dispatch => {

	await axios.delete(`${BASE_ENDPOINT}/cars/${vehicleId}`)
    .then(async () => {
        await  dispatch(getVehicles());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            'Cadastro excluído com sucesso!'
        ))
    })
    .catch(async error => {
        console.log("DEU RUIM", error)
        await dispatch(acToaster.ACTIVE_TOASTER(
            'error',
            'Ocorreu um erro inesperado!'
        ))
        
    })
}

export const checkStatusApi = async () => {
    let response = false;

    await axios.get(BASE_ENDPOINT)
    .then(resp => console.log(resp.data))
    // .then(resp => response = resp.data.online)
    .catch(error => console.log("DEU RUIM", error.response));

    return response;
}
