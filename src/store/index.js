import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {userApi} from './api/admin/userApi'
import userReducer from './reducers/userReducer';
import citiesReducer from './reducers/citiesReducer';

const rootReducer = combineReducers({
  'user': userReducer,
  'cities': citiesReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
  devTools: true,
});


