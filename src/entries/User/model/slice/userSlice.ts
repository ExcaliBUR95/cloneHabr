import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../type/user';

const initialState: UserSchema = {
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthDate: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        Logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

export const { actions: userAction } = userSlice;
export const { reducer: userReducer } = userSlice;
