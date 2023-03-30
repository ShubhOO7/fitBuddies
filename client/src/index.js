import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
import { combineReducers, createStore } from 'redux';
import store from './store';



// const finalReducer = combineReducers({
//     rootReducer: rootReducer
// })
// const initialState = [];
// const store = createStore(finalReducer, initialState);
// store.subscribe(() => console.log(store.getState()));

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};
store.subscribe(() => {
    saveState(store.getState());
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
    <App />
        </Provider>
    </BrowserRouter>
);

