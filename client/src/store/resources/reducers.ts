import { createReducer } from 'redux-act';
import { Article } from './types';
import { setArticles, addArticle, removeArticle } from './actions';

const initialState: Article[] = [];

const reducer = createReducer({}, initialState);

// setArticles completely wipes current state, prefering its payload.
reducer.on(setArticles, (state, payload) => [...initialState, ...payload]);

reducer.on(addArticle, (state, payload) => [
  ...state.filter(article => article.id !== payload.id),
  payload
]);

reducer.on(removeArticle, (state, payload) =>
  state.filter(article => article.id !== payload.id)
);

export default reducer;
