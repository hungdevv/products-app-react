import * as types from './../constants/ActionTypes';
var initialState = {};
const edit = (state = initialState, action) => {
    switch(action.type) {
        case types.EDIT_PRODUCTS:
            return action.product;
        default:
            return {...state};
    }
}
export default edit;