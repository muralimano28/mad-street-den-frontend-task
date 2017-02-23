import { createStore } from 'redux';

let defaultState = {
    products: [],
    filters: [],
    appliedFilters: [],
    noOfItemsToShow: 9
};

const products = (state = defaultState, action) => {
    let { appliedFilters, noOfItemsToShow, products } = state;
    let idx = -1;

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
        case 'ADD_FILTER':
            return {
                ...state,
                appliedFilters: [...appliedFilters, action.value]
            };
        case 'REMOVE_FILTER':
            idx = appliedFilters.indexOf(action.value);

            return {
                ...state,
                appliedFilters: [
                    ...appliedFilters.slice(0, idx),
                    ...appliedFilters.slice(idx + 1)
                ]
            };
        case 'CLEAR_ALL_FILTERS':
            return {
                ...state,
                appliedFilters: []
            };
        case 'LOAD_MORE_PRODUCTS':
            return {
                ...state,
                noOfItemsToShow: noOfItemsToShow + 9
            }
        default:
            return state;
    }
};

const store = createStore(
    products
);

export default store;
