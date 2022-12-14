import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import citiesReducer from './reducers/citiesReducer';

const rootReducer = combineReducers({
  'user': userReducer,
  'cities': citiesReducer,
});

export const store = configureStore({
  reducer: rootReducer, devTools: true,
});


