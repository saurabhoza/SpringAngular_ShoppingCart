import { ProductDetail } from "../models/productDetail";
import * as productDetailActions from '../actions/product-detail.actions';

export interface State {
    ids: number[];
    entities: { [id: number]: ProductDetail };
    selectedId: number | null;
    backURL:string;
  };
  
  export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: null,
    backURL:''
  };

export function reducer(state = initialState, action: productDetailActions.Actions): State {
  
    switch(action.type){

       case productDetailActions.PRODUCT_DETAIL_LOAD:{
        return {
          ids: [ ...state.ids ],
          entities: Object.assign({}, state.entities),
          selectedId: state.selectedId,
          backURL:action.baclUrl
        };
       }
       case productDetailActions.PRODUCT_DETAIL_LOAD_SUCCESS:{
              const productModel = action.payload;
              return {
                ids: [ ...state.ids, productModel.id ],
                entities: Object.assign({}, state.entities, {[productModel.id]: productModel}),
                selectedId: productModel.id,
                backURL:state.backURL
              };
        }    
    default: {
        return state;
      }
  }
}