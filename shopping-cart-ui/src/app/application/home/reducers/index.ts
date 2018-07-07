import { createSelector, createFeatureSelector } from '@ngrx/store';

// reducers
import { State as RootState } from '../../shared/reducers';
import * as fromLogins from './../login/reducers/login.reducers';

export interface HomeState {
  login: fromLogins.State;
}

export interface State extends RootState {
  'login': HomeState;
}

export const reducers = {
  login: fromLogins.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getHomeState = createFeatureSelector<HomeState>('home');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getLoginMemberId = createSelector(
    getHomeState,
  (state: HomeState) =>  state ? state.login.memberId : null
);

export const getToken = createSelector(
  getHomeState,
(state: HomeState) => state ? state.login.entity.token : null
);

export const getLogin = createSelector(
  getHomeState,
(state: HomeState) => state ? state.login.entity : null
);

export const getLoginId = createSelector(
  getHomeState,
(state: HomeState) =>  state ? state.login.entity.userId : null
);
