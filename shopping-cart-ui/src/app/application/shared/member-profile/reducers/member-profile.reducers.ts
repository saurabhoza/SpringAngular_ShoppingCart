import { createSelector } from 'reselect';
import { MemberProfile } from '../models/member-profile';
import * as memberProfile from '../actions/member-profile.actions';


export interface State {
  ids: string[];
  entities: { [id: string]: MemberProfile };
  selectedId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

export function reducer(state = initialState, action: memberProfile.Actions): State {
  switch (action.type) {
    case memberProfile.MEMBER_PROFILE_LOAD_SUCCESS: {
      const memberProfileModel = action.payload;
      return {
        ids: [ ...state.ids, memberProfileModel.id ],
        entities: Object.assign({}, state.entities, {[memberProfileModel.id]: memberProfileModel}),
        selectedId: memberProfileModel.id
      };
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

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});