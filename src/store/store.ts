import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import uiReducer from "@app/store/slices/uiSlice";
//import Saga from './sagas';
import rootSaga from "@app/store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ui: uiReducer,
    // another reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
