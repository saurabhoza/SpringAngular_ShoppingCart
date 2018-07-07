import { Product } from "../models/product.model";
import * as productListActions from '../actions/product-list.actions';

export interface State{
    entities: {[id: string]:Product };
    ids:number[];
    selectedId: number | null;
}

export const initialState:State = {
    entities: {},
    ids:[],
    selectedId: null,
}

export function reducer(state = initialState, action: productListActions.Actions): State {
    switch(action.type){
    
      case productListActions.PRODUCT_LIST_LOAD_SUCCESS : {
        const newProductModels =  Object.assign({},
            state.entities,
            action.productList.reduce((obj, product) => {
                obj[product.id.toString()] = product;
                return obj;
            }, {}));
        const productList: Product[] =action.productList;
        
        return {    
            entities: Object.assign({}, newProductModels),
            ids: productList.map(entity=> entity.id),
            selectedId: null
          };
      }
      default: {
        return state;
      }

    }
}
