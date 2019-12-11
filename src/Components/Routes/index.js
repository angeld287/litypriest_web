import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../Home';
import AuthComponent from './../Authentication/AuthComponent';
import Events from '../Events/';
import Contacts from '../Contacts';
import Categories from '../Categories';
import NewContact from '../Contacts/newContact';
import EditContact from '../Contacts/editContact';
import Locations from '../Locations'

export const Routes = ({ childProps }) => (
	<Switch>
		<Route exact path="/" render={() => <Home />} />
		<ProtectedRoutePriest exact path="/events" render={Events} props={childProps} />
		<ProtectedRoutePriest exact path="/contacts/new" render={NewContact} props={childProps} />
		<ProtectedRoutePriest exact path="/contacts/:id/edit" render={EditContact} props={childProps} />
		<ProtectedRoutePriest exact path="/contacts" render={Contacts} props={childProps} />
		<ProtectedRoutePriest exact path="/categories" render={Categories} props={childProps} />
		<ProtectedRoutePriest exact path="/locations" render={Locations} props={childProps} />
		<ProppedRoute exact path="/signin" render={AuthComponent} props={childProps} />
	</Switch>
);

export const ProtectedRouteClients = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'client' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/modules" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRouteAdmin = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'admin' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRoutePriest = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? childProps.state.user_roll === 'priest' ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to="/" />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
	<Route
		{...rest}
		render={(rProps) =>
			childProps.isLoggedIn ? (
				<C {...rProps} {...childProps} />
			) : (
				<Redirect to={`/signin?redirect=${rProps.location.pathname}${rProps.location.search}`} />
			)}
	/>
);

export const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
	<Route {...rest} render={(rProps) => <C {...rProps} {...childProps} />} />
);
