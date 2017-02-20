import { createStore } from 'redux';

const products = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_DATA_S': // GET_PRODUCT_DATA_SUCCESS - On getting product data success.
            // Loop through the products and get filter list.
            let filters = [];

            for (let i = 0; i < action.products.length; i++) {
                let eachProduct = action.products[i];

                if (filters.indexOf(eachProduct.cat) < 0) {
                    filters.push(eachProduct.cat);
                }
            }

            return {
                ...state,
                products: action.products,
                filters
            };
        case 'GET_PRODUCT_DATA_E': // GET_PRODUCT_DATA_ERROR - On getting product data error.
            return state;
        default:
            return state;
    }
};

const store = createStore(
    products
);

export default store;
