import { CartProduct } from '../models/cart-product';
import * as cartProductActions from '../actions/cart.actions';

export interface State {
    entities: { [id: string]: CartProduct };
    ids: number[];
    selectedId: number | null;
    totalAmount: number | null;
}

export const initialState: State = {
    entities: {},
    ids: [],
    selectedId: null,
    totalAmount: 0
};

export function reducer(state = initialState, action: cartProductActions.Actions): State {
    switch (action.type) {

        case cartProductActions.CART_PRODUCT_ADD_SUCCESS: {
            const  obj: Object = new Object();
            obj[action.payload.product.id.toString()] = action.payload;
            const newCartProducts = Object.assign({}, state.entities, obj);
            const newIdArray: number[] = [];
            newIdArray.push(...state.ids);
            state.ids.indexOf(action.payload.id) > 0 ? newIdArray : newIdArray.push(action.payload.id);
            return {
                entities: newCartProducts,
                ids: newIdArray,
                selectedId: null,
                totalAmount: 0
            };
        }
        case cartProductActions.CART_PRODUCT_LOAD_SUCCESS: {
            const newCartProducts = Object.assign({},
                state.entities,
                action.payload.reduce((obj, cartProduct) => {
                    obj[cartProduct.product.id.toString()] = cartProduct;
                    return obj;
                }, {}));
            const CartProducts: CartProduct[] = action.payload;

            return {
                entities: Object.assign({}, newCartProducts),
                ids: CartProducts.map(entity => entity.product.id),
                selectedId: null,
                totalAmount: 0
            };
        }

        case cartProductActions.CART_PRODUCT_UPDATE_QUANTITY_SUCCESS: {
            const obj: Object = new Object();
            obj[action.payload.product.id.toString()] = action.payload;
            const newIds = [];
            newIds.push(...state.ids);
            // if(state.ids.indexOf(action.payload.id)>=0){
            //     newIds.push(action.payload.id);
            // }

            return {
                entities: Object.assign({}, state.entities, obj),
                ids: newIds,
                selectedId: null,
                totalAmount: 0
            };
        }

        case cartProductActions.CART_PRODUCT_DELETE: {
            const newIds = [];
            state.ids.forEach( (product, index) => {
                console.log('id : ' + product);
                if (product === action.payload.product.id) {
                    state.ids.splice(index, 1); }
              });
            newIds.push(...state.ids);
            const newCartProducts = Object.assign({},
                newIds.reduce((obj, id) => {
                    obj[id.toString()] = state.entities[id];
                    return obj;
                }, {}));

            return {
                entities: Object.assign({}, newCartProducts),
                ids: newIds,
                selectedId: null,
                totalAmount: 0
            };
        }

        case cartProductActions.CART_PRODUCT_SAVE_SUCCESS: {

            return {
                entities: state.entities,
                ids: state.ids,
                selectedId: null,
                totalAmount: action.payload.totalCartAmount
            };
        }

        case cartProductActions.CART_PRODUCT_REMOVE_ALL: {
            return {
                entities:{},
                ids: [],
                selectedId: null,
                totalAmount: 0
            };
        }

        default: {
            return state;
        }

    }
}
