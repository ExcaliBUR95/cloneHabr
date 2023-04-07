/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

 type ReducersListEntry = [StateSchemaKey, Reducer]

 interface DynamicModuleLoaderProps {
         children?: any;
         reducers: ReducersList;
         removeAfterUnmount?: boolean;
 }

export const DynamicModuleLoade: React.FC<DynamicModuleLoaderProps> = (props: React.PropsWithChildren<DynamicModuleLoaderProps>) => {
    const {
        children, reducers, removeAfterUnmount,
    } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    React.useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {children}
        </>
    );
};
