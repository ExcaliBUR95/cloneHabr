import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userAction } from 'entries/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsername {
    username: string,
    password: string,
}

export const loginByUsername = createAsyncThunk<User, LoginByUsername, {rejectValue: string}>(
    'login/loginByUsername',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', {
                username, password,
            });
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userAction.setAuthDate(response.data));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('ERROR');
        }
    },
);
