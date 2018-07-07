import {
    ActionReducer,
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    MetaReducer
  } from '@ngrx/store';
  import { RouterReducerState, routerReducer } from '@ngrx/router-store';
  import { RouterStateUrl } from './../../../shared/utils';
  import * as fromRefrenceData from './../reducers/reference-data.reducers';
  import * as fromHeaderMenu from './../../layout/header-menu/reducers/header-menu.reducers';
  import * as fromMemberProfile from '../member-profile/reducers/member-profile.reducers';
  import * as fromCartProduct from '../../purchase/cart/reducers/cart.reducers';
  // import environment
  import { environment } from './../../../../environments/environment';

  /**
   * As mentioned, we treat each reducer like a table in a database. This means
   * our top level state interface is just a map of keys to inner state types.
   */
  export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
    refrenceData: fromRefrenceData.State;
    headerMenu: fromHeaderMenu.State;
    memberProfiles: fromMemberProfile.State;
    cartProductData: fromCartProduct.State;
  }

  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const reducers: any = {
    routerReducer: routerReducer,
    refrenceData: fromRefrenceData.reducer,
    headerMenu: fromHeaderMenu.reducer,
    memberProfiles: fromMemberProfile.reducer
  };

  export const getAppState = (state: State) => state;

  export const getRouterUrl = createSelector(
    getAppState,
  (state: State) => {
      return state.routerReducer ? state.routerReducer.state.url : null;
  }
);
export const getReferenceData = createSelector(
  getAppState,
(state: State) => {
    return state.refrenceData.referenceData;
}
);
export const getCurrentLanguage = createSelector(
  getAppState,
(state: State) => {
    return state.refrenceData.referenceData.language;
}
);

export const isTransitionActive = createSelector(
  getAppState,
(state: State) => {
    return state.refrenceData.referenceData.activeTransition;
}
);

export const getHeaderMenuEntities = createSelector(
  getAppState,
(state: State) => {
    return state.headerMenu.entities;
}
);
export const getHeaderMenuIds = createSelector(
  getAppState,
(state: State) => {
    return state.headerMenu.ids;
}
);
export const getHeaderMenuList = createSelector( getHeaderMenuEntities, getHeaderMenuIds, (headerMenus, ids) => {
    return ids.map(id => {
      return headerMenus[id];
    });
});


  // log all actions
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
  }

  /**
   * By default, @ngrx/store uses combineReducers with the reducer map to compose
   * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
   * that will be composed to form the root meta-reducer.
   */
  export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

  export const getSelectedMemberProfile = createSelector(
    getAppState,
  (state: State) => {
      return state.memberProfiles.entities[state.memberProfiles.selectedId];
  }
);
export const getSelectedMemberProfileId = createSelector(
  getAppState,
  (state: State) => {
      return state.memberProfiles.selectedId;
  }
);
export const getMemberProfileIds = createSelector(
  getAppState,
  (state: State) => {
      return state.memberProfiles.ids;
  }
);
export const getMemberProfileEntities = createSelector(
     getAppState,
  (state: State) => {
      return state.memberProfiles.entities;
  }
);

export const getCartItemCount = createSelector(
  getAppState,
(state: State) => {
    return state.refrenceData.referenceData.cartItemCount;
}
);

export const getCartProducts = createSelector(
  getAppState,
(state: State) => {
    return state.cartProductData.entities;
});
