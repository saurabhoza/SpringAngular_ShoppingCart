import { createSelector } from 'reselect';
import { Login } from '../models/login';
import * as login from '../actions/login.actions';


export interface State {
  memberId: number;
  entity: Login;
};

export const initialState: State = {
  memberId: null,
  entity: new Login()
};

export function reducer(state = initialState, action: login.Actions): State {
  switch (action.type) {
    case login.LOGIN_SUBMIT_SUCCESS: {
      const loginModel = action.payload;
      return {
        memberId: loginModel.memberId,
        entity: loginModel
      };
    }
    case login.LOGIN_SUBMIT_FAILED: {
      const res = action.payload;
      const message: string = res.Status === 401 ? 'INVALID_USER_ERROR': 'SERVER_ERROR';
      return {
        memberId: state.memberId,
        entity: Object.assign(state.entity, {errMsg: message})
      };
    }
    case login.LOGIN_SUBMIT: {
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntity = (state: State) => state.entity;

export const getIds = (state: State) => state.memberId;