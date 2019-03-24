import * as types from './../constants/ActionTypes';
import apiCall from './../utils/apiCall';

export const actFetchProducts = (products) => {
    return{
        type: types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return apiCall('GET', 'products', null).then(res => {
            dispatch(actFetchProducts(res.data));
        })
    }
}