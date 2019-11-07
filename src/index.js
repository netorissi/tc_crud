import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

// ## ----- CONFIG ----- ## //
import store from './config/store';
import history from './config/history';

ReactDOM.render(
    <Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
    </Provider>,
	document.getElementById('root')
);
