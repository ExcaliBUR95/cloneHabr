import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entries/Counter';
import { userReducer } from 'entries/User';
import { createReducerManager } from './reduceManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
