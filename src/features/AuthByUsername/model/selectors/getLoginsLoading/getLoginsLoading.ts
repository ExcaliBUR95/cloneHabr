import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false;
