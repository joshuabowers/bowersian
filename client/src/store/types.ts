import {
  createAction,
  EmptyActionCreator,
  SimpleActionCreator
} from 'redux-act';

export interface AsyncAction<TSuccess, TFailure> {
  start: EmptyActionCreator;
  success: SimpleActionCreator<TSuccess>;
  failure: SimpleActionCreator<TFailure>;
}

// Creates an AsyncAction object, which contains actions for
// initiating an asynchronous action as well as that action's
// success and failure outcomes.
export function createAsyncAction<TSuccess, TFailure = string>(
  baseActionName: string
): AsyncAction<TSuccess, TFailure> {
  return {
    start: createAction(baseActionName),
    success: createAction<TSuccess>(`${baseActionName} Success`),
    failure: createAction<TFailure>(`${baseActionName} Failure`)
  };
}
