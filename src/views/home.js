import React, { Component } from 'react';
import '../assets/styles/home.css';
import { Grid, Button, TextField } from '@material-ui/core';
import Register from '../components/Register';
import * as acVehicles from '../actions/vehicles';

const STEP_EMPTY = 0;
const STEP_LIST = 1;
const STEP_REGISTER = 2;

class Home extends Component {

    state = {
        stepCurrent: STEP_EMPTY,
        vehicleCurrent: null
    }

    sendSearch = async () => {
        const { textFilter } = this.state;
        const { dispatch } = this.state;
        if (textFilter) {
            await dispatch(acVehicles.getVehicles(textFilter));
            this.setState({ stepCurrent: STEP_LIST });
        }
        else this.homeStep();
    }

    newRegister = () => {
        const { stepCurrent } = this.state;
        if (stepCurrent !== STEP_REGISTER)
            this.setState({ stepCurrent: STEP_REGISTER });
    }
    
    editRegister = vehicleCurrent => {
        const { stepCurrent } = this.state;
        if (stepCurrent !== STEP_REGISTER)
            this.setState({ stepCurrent: STEP_REGISTER });

        this.setState({ vehicleCurrent });
    }

    homeStep = () => {
        this.setState({ 
            stepCurrent: STEP_EMPTY,
            vehicleCurrent: null
        });
    }

    render() {

        const { stepCurrent, vehicleCurrent } = this.state;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item md={10} sm={6} xs={12} className="pd-20">
                            <form onSubmit={this.sendForm} style={{ width: '100%' }}>
                                <TextField
                                className="input-text"
                                label="Pesquisar por um veículo"
                                variant="outlined"
                                />
                            </form>
                        </Grid>
                        <Grid item md={2} sm={6} xs={12} className="pd-20">
                            <Button 
                            variant="contained" 
                            className="btn-register"
                            onClick={this.newRegister}
                            >
                                Cadastrar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className="sectors">
                    <Grid container className="mask-image">
                        <Grid item xs={12}>
                            {stepCurrent === STEP_EMPTY && (
                                <h1>
                                    Pesquisa de veículos do <strong>TradersClub</strong>
                                </h1>
                            )}
                            {stepCurrent === STEP_LIST && (
                                <h1>
                                    LISTA
                                </h1>
                            )}
                            {stepCurrent === STEP_REGISTER && (
                                <Register
                                vehicleCurrent={vehicleCurrent}
                                homeStep={this.homeStep}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Home;