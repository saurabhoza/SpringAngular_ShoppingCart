import { createSelector } from 'reselect';
import { Member } from '../models/member';
import * as member from '../actions/member.actions';


export interface State {
  ids: number[];
  entities: { [id: number]: Member };
  selectedId: number | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

export function reducer(state = initialState, action: member.Actions): State {
  switch (action.type) {
    case member.MEMBER_LOAD_SUCCESS: {
      const memberModel = action.payload;
      return {
        ids: [ ...state.ids, memberModel.id ],
        entities: Object.assign({}, state.entities, {[memberModel.id]: memberModel}),
        selectedId: memberModel.id
      };
    }
    case member.MEMBER_SAVE_SUCCESS: {
        const memberModel = action.payload;
        return {
          ids: [ ...state.ids, memberModel.id ],
          entities: Object.assign({}, state.entities, {[memberModel.id]: memberModel}),
          selectedId: memberModel.id
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