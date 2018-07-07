import { createSelector } from 'reselect';
import { ReferenceData } from '../models/reference-data';
import * as refData from '../actions/reference-data.actions';
import * as transition from '../actions/transition.actions';
import { stagger } from '@angular/animations/src/animation_metadata';


export interface State {
  referenceData: ReferenceData;
};

export const initialState: State = {
  referenceData: {
    activeTransition: false,
    cartItemCount:0,
    language: 'en',
    languageOptions: [{
      name: 'English',
      value: 'en'
    }, {
      name: 'Español',
      value: 'es'
    }]
  }
};

export function reducer(state = initialState, action: refData.Actions | transition.Actions): State {
  switch (action.type) {
    case refData.REFERENCE_DATA_LOAD_SUCCESS: {
      const refDataModel = action.payload;
      return {
        referenceData: refDataModel
      };
    }
    case refData.LANGUAGE_SET: {
      const lang = action.payload;
      return {
        referenceData: Object.assign(state.referenceData, { language: lang })
      };
    }
    case transition.TRANSITION_STARTED: {
      return {
        referenceData: Object.assign(state.referenceData, { activeTransition: true })
      };
    }
    case transition.TRANSITION_COMPLETED: {
      return {
        referenceData: Object.assign(state.referenceData, { activeTransition: false })
      };
    }

    case refData.CART_COUNT_SET : {
      const itemCount = action.payload;
      return {
        referenceData : Object.assign(state.referenceData, { cartItemCount: itemCount })
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

//export const getReferenceData = (state: State) => state.referenceData;
