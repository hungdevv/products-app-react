export const findIndex = (products, id) =>{
    var result = -1;
    products.map((product, index) => {
        if(product.id ===id) {
            result = index;
        }
    })
    return result;
}

