import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/styles/home.css';
import { Grid, Button, TextField } from '@material-ui/core';
import Register from '../components/Register';
import ListVehicles from '../components/ListVehicles';
import * as acVehicles from '../actions/vehicles';

const STEP_EMPTY = 0;
const STEP_LIST = 1;
const STEP_REGISTER = 2;

class Home extends Component {

    state = {
        stepCurrent: STEP_EMPTY,
        vehicleCurrent: null,
        textFilter: '',
        searchParam: ''
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(acVehicles.getVehicles());
    }

    changeSearch = event => {
        this.setState({ textFilter: event.target.value });
        if (!event.target.value) this.homeStep();
    }

    sendSearch = async event => {
        event.preventDefault();
        const { textFilter } = this.state;
        if (textFilter) {
            this.setState({ stepCurrent: STEP_LIST, searchParam: textFilter });
        }
        else {
            this.homeStep();
        }
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
            vehicleCurrent: null,
            textFilter: '',
            searchParam: ''
        });
    }

    render() {

        const { stepCurrent, vehicleCurrent, textFilter, searchParam } = this.state;
        const { vehicles } = this.props.rdVehicles;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item md={10} sm={6} xs={12} className="pd-20">
                            <form onSubmit={this.sendSearch} style={{ width: '100%' }}>
                                <TextField
                                className="input-text"
                                label="Pesquisar por um veículo"
                                variant="outlined"
                                value={textFilter}
                                onChange={evt => this.changeSearch(evt)}
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
                                <ListVehicles
                                vehicles={vehicles}
                                searchParam={searchParam}
                                editRegister={this.editRegister}
                                />
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

const mapStateToProps = state => ({
	rdVehicles: state.rdVehicles
})

export default withRouter(connect(mapStateToProps)(Home));