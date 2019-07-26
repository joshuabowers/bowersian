import { createAsyncAction } from '../types';
import { SystemState } from './types';

export const logIn = createAsyncAction<SystemState>('Log In');
export const logOut = createAsyncAction<SystemState>('Log Out');
