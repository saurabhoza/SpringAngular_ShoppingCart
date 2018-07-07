import { createFeatureSelector, createSelector} from "@ngrx/store";
//import { createSelector } from 'reselect';

// reducers
import { State as RootState } from "../../shared/reducers";
import * as fromProductList from "./../product-list/reducers/product-list.reducers";
import * as fromProductDetail from "./../product-detail/reducers/product-detail.reducers";

export interface DashboardState {  
  productList : fromProductList.State;
  productDetail : fromProductDetail.State;
}

export interface State extends RootState {    
  "productList": DashboardState;
  "productDetail": DashboardState;
}

export const reducers = {  
  productList : fromProductList.reducer,
  productDetail : fromProductDetail.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getDashboardFeatureState = createFeatureSelector<DashboardState>("dashboard");

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */


//export const getMemberProfileEntities = createSelector(getDashboardState, fromMemberProfiles.getEntities);
//export const getMemberProfileIds = createSelector(getDashboardState, fromMemberProfiles.getIds);
//export const getSelectedMemberProfileId = createSelector(getDashboardState, fromMemberProfiles.getSelectedId);
//export const getSelectedMemberProfile = createSelector(getDashboardState, fromMemberProfiles.getSelected);


export const getProductEntities = createSelector(
   getDashboardFeatureState,
 (state : DashboardState) => {
  return state.productList.entities;
 }
);
export const getProductIds = createSelector(
  getDashboardFeatureState,
(state : DashboardState) => {
 return state.productList.ids;
}
);
export const getProductList = createSelector( getProductEntities, getProductIds, (product, ids) => {
  return ids.map(id => {
    return product[id];
  });
});

export const getSelectedProduct = createSelector(
  getDashboardFeatureState,
  (state: DashboardState) => {
      return state.productDetail.entities[state.productDetail.selectedId];
  }
);

export const getBackURL = createSelector(
  getDashboardFeatureState,
  (state : DashboardState) => {
   return state.productDetail.backURL;
  }
);