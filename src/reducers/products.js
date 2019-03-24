import * as types from './../constants/ActionTypes';
import * as func from './../function/findIndex';


var initialState = [
];

const products = (state = initialState, action) => {
    var index = -1;
    var {id} = action;
    switch(action.type) {
        case types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case types.DELETE_PRODUCTS:
            index = func.findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        default: return [...state];
    }
}

export default products