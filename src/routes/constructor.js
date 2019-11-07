import React from 'react';
import { Switch, Route } from 'react-router-dom';

// ## ----- COMPONENTS ----- ## //
import SideBar from '../components/SideBar';

// ## ----- ROUTES ----- ## //
import * as routes from './names';

// ## ----- VIEWS ----- ## //
import Home from '../views/home';
import NotFound404 from '../views/notFound404';

// ## ----- VIEWS ----- ## //
import '../assets/styles/sidebar.css';

const RouteDefault = ({ component: Component, ...rest }) => (
	<Route
	{...rest}
	render={props => (
            <div className="main">
                <SideBar/>
                <div className="menu-layout">
                    <Component {...props} />
                </div>
            </div>
        )
    }/>
);

const Routes = () => {
	return(
        <Switch>
            <RouteDefault 
            path={routes.HOME} 
            exact 
            component={Home}
            />

            <Route 
            path='*' 
            component={NotFound404} 
            />
        </Switch>
	)
}

export default Routes;