import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, purgeStoredState } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from './rootReducer';
import promise from './promise';
import { STORE_KEY_PREFIX } from "@config/constants";

const logger = store => next => action => {
	if (typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

let middlewares = [
	// logger,
	thunk,
	promise
];

const enhancer = compose(
	applyMiddleware(...applyMiddleware),
	autoRehydrate()
)


let createAppStore = applyMiddleware(...middlewares)(createStore);


export default function configureStore(onComplete) {
	const store = createAppStore(reducers, enhancer);


	let opt = {
		storage: AsyncStorage,
		keyPrefix: STORE_KEY_PREFIX,
		blacklist: ['sidemenu']
	};

	// purgeStoredState(opt).then(() => {
	// 	console.log('purge of someReducer completed')
	// }).catch(() => {
	// 	console.log('purge of someReducer failed')
	// })

	persistStore(store, opt, onComplete);
	return store;
}
