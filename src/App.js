import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

// ## --------- COMPONENTS --------- ## //
import Toaster from './components/Toaster';

// ## --------- ROUTES --------- ## //
import Routes from './routes/constructor';

const App = props => {

	const toaster = props.toaster;

	return (
		<Fragment>
			<CssBaseline />
			<Toaster {...toaster} />
			<Routes />
		</Fragment>
	)
}

const mapStateToProps = state => ({
	toaster: state.rdToaster
});

export default withRouter(connect(mapStateToProps)(App));
