import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_ENDPOINT } from '../routes/names';
import { Grid, TextField, Button, MenuItem } from '@material-ui/core';
import { MdSave, MdSend, MdDelete, MdClear } from 'react-icons/md';
import * as formatters from '../helpers/formatters';
import * as acVehicles from '../actions/vehicles';

const newVehicle = {
    title: '',
    model: '',
    brand: '',
    year: '',
    color: '',
    km: '',
    price: '',
}

class Register extends Component {

    constructor(props) {
        super(props);

        const { vehicleCurrent } = this.props;

        this.state = {
            vehicle: vehicleCurrent ? {...vehicleCurrent} : {...newVehicle},
            checkForm: false,
            saveEdit: false,
            arrayBrands: []
        }
    }

    async componentDidMount() {

        await axios.get(`${BASE_ENDPOINT}/`)
    .then(resp => console.log(resp.data))
    // .then(resp => response = resp.data.online)
    .catch(error => console.log("DEU RUIM", error));

        const resp = acVehicles.checkStatusApi();
        console.log(resp)
		await this.getBrands();
	}

    getBrands = async () => {
		await axios.get(BASE_ENDPOINT + '/brands')
		.then(resp => {
            console.log(resp.data);
			if (resp.data)
				this.setState({ arrayBrands: resp.data.brands });
		})
		.catch(error => console.log('Deu Ruim: ' + error));
	}

    createInputBrands = () => {
		const { arrayBrands } = this.state;
		
		const arrayResp = arrayBrands.map(marca => {
			return (
				<MenuItem key={marca.id} value={marca.id}>
					{marca.name}
				</MenuItem>
			)
		})
		return arrayResp;
	}

    inputChange = (event, field) => {
		let { vehicle } = this.state;
        if (field === "title") 
            vehicle.title = event.target.value;
        if (field === "model")
            vehicle.model = event.target.value;
        if (field === "brand")
            vehicle.brand = event.target.value;
        if (field === "year")
            vehicle.year = event.target.value;
        if (field === "color")
            vehicle.color = event.target.value;
        if (field === "km")
            vehicle.km = event.target.value;
        if (field === "price")
            vehicle.price = formatters.numberToReal(event.target.value);
            
            
        if (vehicle.id) this.setState({ vehicle, saveEdit: true });
        else this.setState({ vehicle });
        this.checkForm();
    }

    checkForm = () => {
        let { vehicle, checkForm } = this.state;

        if (
            vehicle.title &&
            vehicle.model &&
            vehicle.brand &&
            vehicle.year &&
            vehicle.color &&
            vehicle.km &&
            vehicle.price
        ) {
            checkForm = true;
        }
        else {
            checkForm = false;
        }
        this.setState({ checkForm });
    }

    saveVehicle = async () => {
        const { vehicle, checkForm, saveEdit } = this.state;
        const { dispatch } = this.props;

        if (checkForm) {
            if (vehicle.id && saveEdit)
                await dispatch(acVehicles.putVehicles(vehicle));
            else
                await dispatch(acVehicles.postVehicles(vehicle));
        }
    }
    
    removeVehicle = async vehicleId => {
        const { dispatch, homeStep } = this.props;

        if (vehicleId) {
            await dispatch(acVehicles.deleteVehicles(vehicleId));
            homeStep();
        }
    }

    cancelForm = () => {
        const { homeStep } = this.props;
        homeStep();
    }

    render() {

        const { vehicle, checkForm, saveEdit } = this.state;

        return (
            <Grid container style={{ padding: 40 }}>
                <Grid item xs={12} className="pd-20">
                    <TextField
                    label="Título"
                    className="input-text"
                    value={vehicle.title}
                    onChange={evt => this.inputChange(evt, 'title')}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12} className="pd-20">
                    <TextField
                    label="Modelo"
                    className="input-text"
                    value={vehicle.model}
                    onChange={evt => this.inputChange(evt, 'model')}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12} className="pd-20">
                    <TextField
                    label="Ano"
                    className="input-text"
                    value={vehicle.year}
                    onChange={evt => this.inputChange(evt, 'year')}
                    />
                </Grid>
                <Grid item xs={12} className="pd-20">
                    <TextField
                    select
                    label="Marca"
                    className="input-text"
                    value={vehicle.brand}
                    onChange={evt => this.inputChange(evt, 'brand')}
                    >

                        {this.createInputBrands()}
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12} className="pd-20">
                    <TextField
                    label="Cor"
                    className="input-text"
                    value={vehicle.color}
                    onChange={evt => this.inputChange(evt, 'color')}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12} className="pd-20">
                    <TextField
                    label="Preço"
                    className="input-text"
                    value={vehicle.price}
                    onChange={evt => this.inputChange(evt, 'price')}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12} className="pd-20">
                    <TextField
                    label="KM"
                    className="input-text"
                    value={vehicle.km}
                    onChange={evt => this.inputChange(evt, 'km')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item md={6} sm={12} xs={12}>
                            {vehicle.id && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<MdDelete/>}
                                    onClick={() => this.removeVehicle(vehicle.id)}
                                >
                                    Remover
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<MdClear/>}
                                onClick={this.cancelForm}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'right' }}>
                            {vehicle.id ? (
                                <Button
                                    disabled={!checkForm || !saveEdit}
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<MdSave/>}
                                    onClick={this.saveVehicle}
                                >
                                    Salvar
                                </Button>
                            ) : (
                                <Button
                                    disabled={!checkForm}
                                    variant="contained"
                                    color="primary"
                                    endIcon={<MdSend/>}
                                    onClick={this.saveVehicle}
                                >
                                    Cadastrar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(connect()(Register));