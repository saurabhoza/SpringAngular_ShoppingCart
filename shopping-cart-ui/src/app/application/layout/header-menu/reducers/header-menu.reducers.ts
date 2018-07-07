import { createSelector } from 'reselect';
import { HeaderMenu } from '../models/header-menu';
import * as headerMenu from '../actions/header-menu.actions';


export interface State {
  ids: number[];
  entities: { [id: string]: HeaderMenu };
  selectedId: number | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

export function reducer(state = initialState, action: headerMenu.Actions): State {
  switch (action.type) {
    case headerMenu.HEADER_MENU_LOAD_SUCCESS: {
      const headerMenuModelList = action.payload;
      const newHeaderMenuIds = headerMenuModelList.map(headerMenu => headerMenu.id);
      //const newheaderMenuModels = headerMenuModelList.map(headerMenu => Object.assign({},({[headerMenu.id.toString()]:headerMenu})));
      const newHeaderMenuModels =  Object.assign({},
        state.entities,
        action.payload.reduce((obj, product) => {
            obj[product.id.toString()] = product;
            return obj;
        }, {}));
      return {
        ids: newHeaderMenuIds,
        entities: Object.assign({},newHeaderMenuModels),
        selectedId: null
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