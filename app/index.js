

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Text } from "react-native";
import configureStore from '@redux/configureStore';
import { Router } from 'react-native-router-flux';
let store = configureStore();

import { firebaseApp } from '@config/firebase'

import AppRoutes from '@navigation/';
const RouterWithRedux = connect()(Router);

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			store: configureStore(() => { this.setState({ isLoading: false }) })
		}
	}
	render() {
		if (this.state.isLoading) {
			//console.log('loading app');
			return <Text>Loading</Text>;
		}
		return (
			<Provider store={this.state.store}>
				<RouterWithRedux panHandlers={null}
					scenes={AppRoutes} />
			</Provider>
		)
	}
}

