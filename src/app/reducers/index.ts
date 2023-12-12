import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { formReducer } from './formReducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  form: formReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
