import { createStore } from 'redux';

import rootReducer from './reducers/index';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

export default store;



