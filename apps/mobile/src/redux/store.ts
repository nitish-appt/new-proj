import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice'
import createSagaMiddleware from '@redux-saga/core';
import { rootSagas } from './sagas';
import logger from "redux-logger";
// ...

const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({ thunk: false }),
    logger,
    sagaMiddleware,
];

const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware
})
sagaMiddleware.run(rootSagas);

export type RootState = ReturnType<typeof store.getState>

export default store
