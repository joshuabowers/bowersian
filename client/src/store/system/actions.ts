import { createAsyncAction } from '../types';
import { SystemState, Login } from './types';

export const logIn = createAsyncAction<Login, SystemState>('Log In');
export const logOut = createAsyncAction<null, SystemState>('Log Out');
