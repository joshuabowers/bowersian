import { createAction } from 'redux-act';
import { Article } from './types';

export const setArticles = createAction<Article[]>('Set articles');
export const addArticle = createAction<Article>('Add article');
export const removeArticle = createAction<Article>('Remove article');
