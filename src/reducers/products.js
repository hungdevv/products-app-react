import * as types from './../constants/ActionTypes';
import * as func from './../function/findIndex';


var initialState = [];

const products = (state = initialState, action) => {
    var index = -1;
    var {id, product} = action;
    switch(action.type) {
        case types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case types.DELETE_PRODUCTS:
            index = func.findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case types.ADD_PRODUCTS:
            state.push(action.product)
            return [...state];
        case types.UPDATE_PRODUCTS:
            index = func.findIndex(state, product.id);
            state[index] = product;
            return [...state];
        case types.SORT_PRODUCTS:
             state = action.products.filter(product => product.status === true);
             return [...state];
        default: return [...state];
    }
}

export default products