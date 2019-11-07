import React from 'react';
import { NavLink } from 'react-router-dom';

// ## ----- IMAGES ----- ## //
import image404 from '../assets/images/404-not-found.gif';

// ## ----- MATERIAL-UI ----- ## //
import { Grid, Typography, Button, withStyles } from '@material-ui/core';

// ## ----- ICONS ----- ## //
import { MdUndo } from 'react-icons/md';

// ## ----- ROUTES ----- ## //
import * as routes from '../routes/names';

// ## ----- STYLES ----- ## //
import style from '../assets/styles/404NotFound';

const NotFound404 = props => {

    const { classes } = props;
    
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Página não encontrada!
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <img src={image404} alt="Not Found" />
            </Grid>

            <Grid item xs={12}>
                <NavLink
                    exact
                    to={routes.HOME}
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<MdUndo/>}
                    >
                        Ir para a página inicial
                    </Button>
                </NavLink>
            </Grid>

        </Grid>
    )
}

export default withStyles(style)(NotFound404);