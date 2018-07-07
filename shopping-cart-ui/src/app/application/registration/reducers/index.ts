import { createFeatureSelector, createSelector } from "@ngrx/store";
//import { createSelector } from 'reselect';

// reducers
import { State as RootState } from "../../shared/reducers";
import * as fromMember from "./../member/reducers/member.reducers";

export interface RegistrationState {
    members: fromMember.State;
}

export interface State extends RootState {
    "members": RegistrationState;
}

export const reducers = {
    members: fromMember.reducer
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const getRegistrationFeatureState = createFeatureSelector<RegistrationState>("registration");

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
// export const getRegistrationState = (state: RegistrationState) => state.members;     // this can be used in eager loading as used for router in "shared/index.ts"

export const getSelectedMember = createSelector(
    getRegistrationFeatureState,
    (state: RegistrationState) => {
        return state.members.entities[state.members.selectedId];
    }
);
export const getSelectedMemberId = createSelector(
    getRegistrationFeatureState,
    (state: RegistrationState) => {
        return state.members.selectedId;
    }
);
export const getMemberIds = createSelector(
    getRegistrationFeatureState,
    (state: RegistrationState) => {
        return state.members.ids;
    }
);
export const getMemberEntities = createSelector(
    getRegistrationFeatureState,
    (state: RegistrationState) => {
        return state.members.entities;
    }
);
