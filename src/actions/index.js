import * as types from './../constants/ActionTypes';
import apiCall from './../utils/apiCall';
import callApi from './../utils/apiCall';

export const actFetchProducts = (products) => {
    return{
        type: types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchProductsRequest = () => {
    return dispatch => {
        return apiCall('GET', 'products', null).then(res => {
            dispatch(actFetchProducts(res.data));
        })
    }
}

export const actDeleteProducts =  (id) => {
    return{
        type: types.DELETE_PRODUCTS,
        id
    }
}

export const actDeleteProductsRequest = (id) => {
    return dispatch => {
        return callApi('DELETE', `products/${id}`, null).then(res => {
            dispatch(actDeleteProducts(id))
        })
    }
}

export const actAddProducts = (product) => {
    return{
        type: types.ADD_PRODUCTS,
        product
    }
}

export const actAddProductsRequest = (product) => {
    return(dispatch) => {
        return callApi("POST", 'products', product).then(
            res => dispatch(actAddProducts(res.data))
        )
    }
}