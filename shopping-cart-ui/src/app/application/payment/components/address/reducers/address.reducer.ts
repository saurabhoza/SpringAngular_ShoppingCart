import { Address } from '../models/address';
import * as  AddressActions from '../actions/address.actions';

export interface State {
    entities: { [id: string]: Address };
    ids: number[];
}

export const initialState: State = {
    entities: {},
    ids: []
};

export function reducer(state = initialState, action: AddressActions.Actions): State {
    switch (action.type) {

        case AddressActions.SHIPPING_ADDRESS_SAVE: {
            const  obj: Object  = new Object();
            obj[1]              = action.payload;
            state.entities      = {};
            const addressEntry  = Object.assign({}, state.entities, obj);
            const newIdArray: number[] = [];
            newIdArray.push(1);
            return {
                entities: addressEntry,
                ids: newIdArray
            };
        }

        default: {
            return state;
        }

    }
}
