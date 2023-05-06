import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {userApi} from './api/admin/userApi'
import userReducer from './reducers/userReducer';
import citiesReducer from './reducers/citiesReducer';
import { courseApi } from './api/admin/courseApi';
import { paidCourseApi } from './api/admin/paidCourseApi';
import { curatorApi } from './api/admin/curatorApi';

const rootReducer = combineReducers({
  'user': userReducer,
  'cities': citiesReducer,
  [userApi.reducerPath]: userApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [paidCourseApi.reducerPath]: paidCourseApi.reducer,
  [curatorApi.reducerPath]: curatorApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(courseApi.middleware).concat(paidCourseApi.middleware)
    .concat(curatorApi.middleware),
  devTools: true,
});


